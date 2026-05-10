import 'dotenv/config';
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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

  // Step 4: Send Emails via Resend
  console.log('Sending emails...');
  const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
  const emailDiag: { user?: { ok: boolean; status?: number; body?: string }; owner?: { ok: boolean; status?: number; body?: string }; error?: string; hasKey: boolean } = { hasKey: !!RESEND_API_KEY };
  if (RESEND_API_KEY) {
    try {
      // Email 1: Confirmation email to the user
      const userEmailHtml = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0D0D12;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D0D12;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr><td style="padding-bottom:40px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:10px;vertical-align:middle;">
                <!-- Constellation mark -->
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="4"  r="2.2" fill="#F4F1EA"/>
                  <circle cx="16" cy="16" r="2.2" fill="#F4F1EA"/>
                  <circle cx="6"  cy="16" r="1.6" fill="#F4F1EA"/>
                  <circle cx="26" cy="16" r="1.6" fill="#F4F1EA"/>
                  <circle cx="12" cy="26" r="1.6" fill="#F4F1EA"/>
                  <line x1="16" y1="6" x2="16" y2="14" stroke="#F4F1EA" stroke-width="0.8" stroke-opacity="0.4"/>
                  <line x1="8"  y1="16" x2="14" y2="16" stroke="#F4F1EA" stroke-width="0.8" stroke-opacity="0.4"/>
                  <line x1="18" y1="16" x2="24" y2="16" stroke="#F4F1EA" stroke-width="0.8" stroke-opacity="0.4"/>
                  <line x1="15" y1="18" x2="13" y2="24" stroke="#F4F1EA" stroke-width="0.8" stroke-opacity="0.4"/>
                </svg>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-family:Georgia,serif;color:#F4F1EA;font-size:18px;font-weight:600;letter-spacing:-0.02em;">Cygnus IA</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="border-top:1px solid rgba(244,241,234,0.1);padding-bottom:40px;"></td></tr>

        <!-- Body -->
        <tr><td>
          <p style="font-family:Georgia,serif;color:#F4F1EA;font-size:28px;font-weight:400;line-height:1.2;margin:0 0 24px 0;letter-spacing:-0.02em;">
            Hola ${nombre},
          </p>
          <p style="font-family:Arial,sans-serif;color:rgba(244,241,234,0.7);font-size:16px;line-height:1.65;margin:0 0 16px 0;">
            Recibimos tu consulta sobre <strong style="color:#F4F1EA;">${empresa}</strong>. Nuestro equipo está revisando tu caso en este momento.
          </p>
          <p style="font-family:Arial,sans-serif;color:rgba(244,241,234,0.7);font-size:16px;line-height:1.65;margin:0 0 40px 0;">
            En menos de <strong style="color:#F4F1EA;">24 horas</strong> te escribimos para agendar el diagnóstico gratuito de 15 minutos y mostrarte exactamente cuántas horas podés recuperar al mes con IA.
          </p>

          <!-- CTA button -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
            <tr>
              <td style="background-color:#B8341E;border-radius:100px;padding:14px 28px;">
                <span style="font-family:Arial,sans-serif;color:#F4F1EA;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.01em;">
                  Agendar diagnóstico gratis →
                </span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="border-top:1px solid rgba(244,241,234,0.1);padding-top:32px;">
          <p style="font-family:monospace,Courier;color:rgba(244,241,234,0.35);font-size:11px;letter-spacing:0.07em;text-transform:uppercase;margin:0 0 4px 0;">Con criterio,</p>
          <p style="font-family:Georgia,serif;color:#F4F1EA;font-size:15px;font-weight:600;margin:0 0 2px 0;">El equipo de Cygnus IA</p>
          <p style="font-family:monospace,Courier;color:#B8341E;font-size:11px;letter-spacing:0.07em;text-transform:uppercase;margin:0;">Agencia de automatización B2B · LATAM</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

      const userEmailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Cygnus IA <hola@cygnusia.com>',
          to: email,
          subject: 'Diagnóstico de Automatización Confirmado - Cygnus IA',
          html: userEmailHtml,
        }),
      });

      const userBody = await userEmailRes.text();
      emailDiag.user = { ok: userEmailRes.ok, status: userEmailRes.status, body: userBody.slice(0, 500) };
      if (userEmailRes.ok) {
        console.log('Confirmation email sent to user');
      } else {
        console.error('Error sending user email:', userBody);
      }

      // Email 2: Notification email to owner (hola@cygnusia.com)
      const ownerEmailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4F1EA; padding: 40px; color: #0D0D12;">
          <h2 style="color: #0D0D12; font-weight: bold; font-size: 24px; margin-bottom: 24px;">🎯 Nuevo Lead Recibido</h2>
          <div style="background-color: white; padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #B8341E;">
            <p style="margin: 0 0 12px 0;"><strong>Nombre:</strong> ${nombre}</p>
            <p style="margin: 0 0 12px 0;"><strong>Empresa:</strong> ${empresa}</p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #B8341E; text-decoration: none;">${email}</a></p>
            ${website ? `<p style="margin: 0 0 12px 0;"><strong>Sitio Web:</strong> <a href="${website}" style="color: #B8341E; text-decoration: none;" target="_blank">${website}</a></p>` : ''}
            <p style="margin: 0;"><strong>Score IA:</strong> <span style="font-size: 18px; font-weight: bold; color: ${score >= 70 ? '#2ecc71' : score >= 40 ? '#f39c12' : '#e74c3c'};">${score}/100</span></p>
          </div>
          <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <p style="font-size: 14px; color: #666; margin: 0;"><strong>Análisis:</strong> ${reasoning}</p>
            ${tags.length > 0 ? `<p style="font-size: 12px; color: #999; margin-top: 12px; margin-bottom: 0;"><strong>Tags:</strong> ${tags.join(', ')}</p>` : ''}
          </div>
          <p style="font-size: 14px; color: #666; text-align: center; margin-top: 32px;">Recibido el ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      `;

      const ownerEmailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Cygnus IA <hola@cygnusia.com>',
          to: 'hola@cygnusia.com',
          subject: `Nuevo Lead: ${nombre} (${empresa}) - Score ${score}/100`,
          html: ownerEmailHtml,
        }),
      });

      const ownerBody = await ownerEmailRes.text();
      emailDiag.owner = { ok: ownerEmailRes.ok, status: ownerEmailRes.status, body: ownerBody.slice(0, 500) };
      if (ownerEmailRes.ok) {
        console.log('Notification email sent to owner');
      } else {
        console.error('Error sending owner email:', ownerBody);
      }
    } catch (err) {
      emailDiag.error = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      console.error('Email sending failed:', err);
    }
  } else {
    console.log('Skipped emails: RESEND_API_KEY not configured');
  }

  // Return success regardless of Airtable status (lead is captured in logs at minimum)
  return res.status(200).json({
    success: true,
    message: 'Lead recibido correctamente',
    _diag: req.headers['x-diagnostic'] === 'true' ? { email: emailDiag, airtable: airtableSuccess, score, reasoning, tags } : undefined,
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    gemini: !!GEMINI_API_KEY,
    airtable: !!(AIRTABLE_API_KEY && AIRTABLE_BASE_ID),
    resend: !!process.env.RESEND_API_KEY,
  });
});

// Only start the server when running locally (not on Vercel serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🔭 Cygnus IA Lead API running on port ${PORT}`);
    console.log(`   Gemini: ${GEMINI_API_KEY ? '✓' : '✗ missing GEMINI_API_KEY'}`);
    console.log(`   Airtable: ${AIRTABLE_API_KEY ? '✓' : '✗ missing AIRTABLE_API_KEY'}`);
    console.log(`   Resend: ${process.env.RESEND_API_KEY ? '✓' : '✗ missing RESEND_API_KEY'}`);
    console.log(`   Base: ${AIRTABLE_BASE_ID || '✗ missing AIRTABLE_BASE_ID'}\n`);
  });
}

export default app;
