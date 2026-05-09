import 'dotenv/config';
/**
 * Lead Processing API
 * 
 * This Express server handles:
 * 1. Receive lead data from the form
 * 2. Scrape the prospect's website (if provided)
 * 3. Send scraped data to Gemini for lead scoring (1-100)
 * 4. Push the scored lead to Airtable
 */

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// ─── Config (from environment) ─── //
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads';
const PORT = process.env.PORT || 3001;

// ─── Helpers ─── //

/** Scrape basic text content from a URL */
async function scrapeWebsite(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CygnusIA-LeadBot/1.0)',
        'Accept': 'text/html',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return `[Error: HTTP ${res.status}]`;

    const html = await res.text();

    // Basic HTML to text extraction
    const text = html
      // Remove scripts/styles
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      // Get meta description
      .replace(/.*?<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>.*/is, 'META_DESC: $1\n')
      // Get title
      .replace(/.*?<title[^>]*>([\s\S]*?)<\/title>.*/is, 'TITLE: $1\n')
      // Strip HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Truncate to ~3000 chars for Gemini context
    return text.slice(0, 3000);
  } catch (err) {
    return `[Scrape failed: ${err instanceof Error ? err.message : 'Unknown error'}]`;
  }
}

/** Score a lead using Gemini */
async function scoreWithGemini(lead: {
  nombre: string;
  empresa: string;
  email: string;
  website: string;
  scrapedContent: string;
}): Promise<{ score: number; reasoning: string; tags: string[] }> {
  if (!GEMINI_API_KEY) {
    return { score: 50, reasoning: 'Gemini API key not configured', tags: ['unscored'] };
  }

  const prompt = `Eres un analista de calificación de leads para una agencia de automatización con IA llamada Cygnus IA, que trabaja con PyMEs en LATAM y España.

Analiza este prospecto y dale una puntuación del 1 al 100 basándote en estos criterios:
- ¿Es un negocio B2B? (mayor prioridad)
- ¿Parece tener alto presupuesto? (indicadores: industria, tamaño aparente, calidad del sitio web)
- ¿Es una empresa mediana o grande? (más de 10 empleados estimados)
- ¿Opera en una industria que se beneficia de automatización? (legal, inmobiliaria, servicios profesionales, logística, educación, e-commerce)
- ¿El email es corporativo (dominio propio) vs. gmail/hotmail?
- ¿Tiene sitio web profesional?
- ¿El contenido del sitio sugiere procesos manuales que podrían automatizarse?

DATOS DEL PROSPECTO:
- Nombre: ${lead.nombre}
- Empresa: ${lead.empresa}
- Email: ${lead.email}
- Sitio web: ${lead.website || 'No proporcionado'}
- Contenido scrapeado del sitio: ${lead.scrapedContent || 'No disponible'}

Responde SOLO en este formato JSON exacto, sin markdown ni texto adicional:
{"score": <número 1-100>, "reasoning": "<explicación breve en español, máximo 200 caracteres>", "tags": ["<tag1>", "<tag2>"]}

Tags posibles: "b2b", "b2c", "alto-presupuesto", "bajo-presupuesto", "empresa-grande", "pyme", "email-corporativo", "email-genérico", "con-web", "sin-web", "automatización-alta", "automatización-media", "automatización-baja"`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API error:', errText);
      return { score: 50, reasoning: 'Error en la API de Gemini', tags: ['error-scoring'] };
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse JSON from response (handle possible markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        score: Math.min(100, Math.max(1, Number(parsed.score) || 50)),
        reasoning: String(parsed.reasoning || ''),
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      };
    }

    return { score: 50, reasoning: 'No se pudo parsear la respuesta', tags: ['parse-error'] };
  } catch (err) {
    console.error('Gemini scoring error:', err);
    return { score: 50, reasoning: 'Error de conexión con Gemini', tags: ['connection-error'] };
  }
}

/** Push lead to Airtable */
async function pushToAirtable(record: {
  nombre: string;
  empresa: string;
  email: string;
  website: string;
  score: number;
  reasoning: string;
  tags: string[];
}): Promise<boolean> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn('Airtable not configured, skipping push');
    return false;
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Nombre: record.nombre,
                Empresa: record.empresa,
                Email: record.email,
                'Sitio Web': record.website || '',
                'Score IA': record.score,
                'Análisis': record.reasoning,
                Tags: record.tags.join(', '),
                'Fecha': new Date().toISOString(),
                Estado: record.score >= 70 ? 'Alta prioridad' : record.score >= 40 ? 'Media prioridad' : 'Baja prioridad',
              },
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('Airtable error:', errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Airtable push error:', err);
    return false;
  }
}

// ─── API Route ─── //

app.post('/api/lead', async (req, res) => {
  const { nombre, empresa, email, website } = req.body;

  // Validation
  if (!nombre || !empresa || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, empresa, email' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  console.log(`\n── New Lead ──`);
  console.log(`Name: ${nombre} | Company: ${empresa} | Email: ${email} | Web: ${website || 'none'}`);

  // Step 1: Scrape website if provided
  let scrapedContent = '';
  if (website) {
    console.log(`Scraping ${website}...`);
    scrapedContent = await scrapeWebsite(website);
    console.log(`Scraped ${scrapedContent.length} chars`);
  }

  // Step 2: Score with Gemini
  console.log('Scoring with Gemini...');
  const { score, reasoning, tags } = await scoreWithGemini({
    nombre,
    empresa,
    email,
    website: website || '',
    scrapedContent,
  });
  console.log(`Score: ${score}/100 | Tags: ${tags.join(', ')} | ${reasoning}`);

  // Step 3: Push to Airtable
  console.log('Pushing to Airtable...');
  const airtableSuccess = await pushToAirtable({
    nombre,
    empresa,
    email,
    website: website || '',
    score,
    reasoning,
    tags,
  });
  console.log(`Airtable: ${airtableSuccess ? 'OK' : 'SKIPPED/FAILED'}`);

  // Step 4: Send Confirmation Email via Resend
  console.log('Sending confirmation email...');
  const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
  if (RESEND_API_KEY) {
    try {
      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-w-width: 600px; margin: 0 auto; background-color: #F4F1EA; padding: 40px; color: #0D0D12;">
          <h2 style="color: #0D0D12; font-weight: normal; font-size: 24px; margin-bottom: 24px;">Hola ${nombre},</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #4A4A52;">Hemos recibido con éxito tu información de contacto y detalles sobre <strong>${empresa}</strong>.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #4A4A52;">Nuestro equipo está revisando tu caso en este momento. En menos de 24 horas nos pondremos en contacto contigo para agendar el diagnóstico gratuito de 15 minutos y mostrarte exactamente cuántas horas puedes recuperar al mes con IA.</p>
          <hr style="border: 0; border-top: 1px solid rgba(13, 13, 18, 0.1); margin: 32px 0;" />
          <p style="font-size: 14px; color: #8A8A93; margin-bottom: 8px;">Con criterio,</p>
          <p style="font-size: 16px; font-weight: bold; color: #0D0D12; margin: 0;">El equipo de Cygnus IA</p>
          <p style="font-size: 12px; color: #B8341E; margin-top: 4px;">Agencia de automatización B2B</p>
        </div>
      `;

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Cygnus IA <hola@cygnusia.com>',
          to: email,
          subject: 'Diagnóstico de Automatización Confirmado - Cygnus IA',
          html: emailHtml,
        }),
      });

      if (!emailRes.ok) {
        const emailErr = await emailRes.text();
        console.error('Resend error:', emailErr);
      } else {
        console.log('Email sent successfully');
      }
    } catch (err) {
      console.error('Email sending failed:', err);
    }
  } else {
    console.log('Skipped email: RESEND_API_KEY not configured');
  }

  // Return success regardless of Airtable status (lead is captured in logs at minimum)
  return res.status(200).json({
    success: true,
    message: 'Lead recibido correctamente',
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    gemini: !!GEMINI_API_KEY,
    airtable: !!(AIRTABLE_API_KEY && AIRTABLE_BASE_ID),
  });
});

app.listen(PORT, () => {
  console.log(`\n🔭 Cygnus IA Lead API running on port ${PORT}`);
  console.log(`   Gemini: ${GEMINI_API_KEY ? '✓ configured' : '✗ missing GEMINI_API_KEY'}`);
  console.log(`   Airtable: ${AIRTABLE_API_KEY ? '✓ configured' : '✗ missing AIRTABLE_API_KEY'}`);
  console.log(`   Base: ${AIRTABLE_BASE_ID || '✗ missing AIRTABLE_BASE_ID'}\n`);
});

export default app;
