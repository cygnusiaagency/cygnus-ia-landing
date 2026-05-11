# Setup del Sistema de Adquisición — Pasos Manuales

Esta carpeta contiene las plantillas y el procedimiento operativo para conseguir el primer cliente. Antes de empezar el outreach, hay que terminar 4 pasos manuales que el agente no pudo hacer (por permisos o porque viven afuera del repo).

## ✅ Lo que ya está en el código

- Variante de landing en `/inmobiliarias` (ver [src/pages/Inmobiliarias.tsx](../src/pages/Inmobiliarias.tsx))
- Demo SV.02 funcional en `/demo-inmobiliaria` (ver [src/pages/DemoInmobiliaria.tsx](../src/pages/DemoInmobiliaria.tsx)) usando el endpoint `POST /api/demo-chat` con datos de "Inmobiliaria del Sol"
- Captura de UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) y de `niche` en el formulario, persistidos en `sessionStorage` para sobrevivir a la navegación interna
- Bloque post-éxito con CTA "Reservar 15 minutos" → Cal.com (default `https://cal.com/cygnusia/diagnostico-15min`)
- Endpoint `/api/lead` extendido para guardar UTMs + niche en Airtable, con retry automático si las columnas todavía no existen

## 🔧 Pasos manuales pendientes

### 1. Cal.com — crear el evento de 15 min

1. Ir a https://cal.com → crear cuenta gratis con `hola@cygnusia.com`.
2. Crear "Event Type" → "Diagnóstico Cygnus IA · 15 min".
3. Configurar:
   - Duración: 15 minutos
   - Buffer antes/después: 5 minutos
   - Disponibilidad: tus horas reales (ej. lun-vie 10-19 ART)
   - Preguntas extra: "¿Qué proceso te gustaría automatizar?" (opcional)
4. URL pública resultante: ej. `cal.com/cygnusia/diagnostico-15min`. Si difiere del default, abrir [src/components/FinalCTA.tsx](../src/components/FinalCTA.tsx) y editar la constante `DEFAULT_CAL_LINK` (línea ~30).

### 2. Airtable — agregar columnas y tabla

**A) En la tabla actual `Leads-landing-page` (base `appFWzEElNKbIFV3n`)**, agregar las siguientes columnas (todas tipo "Single line text"):

- `Niche`
- `UTM Source`
- `UTM Medium`
- `UTM Campaign`
- `UTM Term`
- `UTM Content`

> Importante: si no las creás, el sistema sigue funcionando — el endpoint detecta `UNKNOWN_FIELD_NAME` y reintenta sin esos campos. Pero no vas a poder atribuir conversiones por canal hasta que existan.

**B) Crear tabla nueva `Outbound-prospects`** con estos campos:

| Campo | Tipo |
|---|---|
| Nombre | Single line text |
| Inmobiliaria | Single line text |
| Ciudad | Single line text |
| País | Single select (España, México, Argentina, Chile, Colombia, Otros) |
| Web | URL |
| Email | Email |
| WhatsApp | Phone number |
| Instagram | URL |
| Fuente | Single select (Idealista, Inmuebles24, Zonaprop, Google Maps, COAPI, AMPI, CUCICBA, Otros) |
| Fecha primer contacto | Date |
| Canal | Single select (Email, WhatsApp, Instagram) |
| Estado | Single select (Contactado, Respondió, Demo enviada, Call agendada, Propuesta, Cerrado, Descartado) |
| Notas | Long text |
| Loom URL | URL |

**C) Vistas a crear** en la tabla `Outbound-prospects`:

1. **Kanban por Estado** — agrupada por la columna `Estado`. Vista visual del pipeline.
2. **Follow-up hoy** — filtro: `Estado = Contactado` AND `Fecha primer contacto = hace exactamente 3 días`. Para tu rutina de tarde.
3. **Follow-up final** — filtro: `Estado = Contactado` AND `Fecha primer contacto = hace exactamente 7 días`. Último intento antes de descartar.

### 3. Vercel — activar Web Analytics (opcional)

1. Vercel dashboard → proyecto Cygnus IA → pestaña "Analytics".
2. Toggle on. No requiere cambios de código.
3. Después de re-deploy, las visitas con UTMs aparecen en el panel.

> No es crítico. Las UTMs en Airtable ya te dicen qué canal convierte. Si tenés tiempo, activalo; si no, salteá este paso.

### 4. Build y deploy

Desde la raíz `cygnus-ia-landing/`:

```bash
npm install     # sin nuevas dependencias, sólo verificar el lock
npm run build   # valida TypeScript y genera dist/
vercel deploy --prod
```

Después del deploy, verificá los 8 pasos del checklist al final de este archivo.

## 🚀 Operativa diaria (3-4 h/día)

### Bloque mañana — 2h

**Tarea 1 (60 min): prospectar 40-60 inmobiliarias** (cargar en `Outbound-prospects`)

Fuentes de listas (todas gratis):
- **España**: idealista.com, fotocasa.es, habitaclia.com (filtrar por ciudad → cada listing tiene contacto)
- **México**: inmuebles24.com, vivanuncios.com.mx, lamudi.com.mx
- **Argentina**: zonaprop.com.ar, argenprop.com, properati.com.ar
- **Asociaciones (directorios públicos de socios)**:
  - España: COAPI (coapi.com), API (api.cat)
  - México: AMPI (ampi.org)
  - Argentina: CUCICBA (cucicba.com.ar), CMCPSF (cmcpsf.org.ar)
- **Google Maps**: buscar `inmobiliarias [ciudad]` → 20 resultados con web/teléfono visible

Para cada inmobiliaria, anotar: nombre, ciudad, país, web, email (si está visible), WhatsApp, IG, fuente.

**Tarea 2 (60 min): grabar 5-8 Looms personalizados + envío**

Para cada prospect priorizado (tener web buena):
1. Abrir `https://cygnusia.com/demo-inmobiliaria` en una pestaña + la web del prospect en otra.
2. Grabar Loom de 60 s: "Hola [Nombre], soy Pol de Cygnus IA. Vi que tu inmobiliaria [Inmobiliaria] tiene [observación específica de su web]. Hicimos esta demo de un asistente que cualifica leads 24/7 — mirá [hacer 2-3 preguntas en la demo]. Si te interesa una así con tus propias propiedades, agendá 15 min: cygnusia.com/inmobiliarias?utm_source=email&utm_medium=cold&utm_campaign=inmob-[país]-batch1"
3. Enviar email con la plantilla (ver `email-cold-v1.md` o `v2.md`) — máximo 30-40 emails/día desde Gmail manual para no quemar el dominio.

### Bloque tarde — 1.5h

**Tarea 3 (45 min): WhatsApp + Instagram DM directo**

Más informal, mayor volumen posible (80-100/día). Plantillas: `whatsapp-opener.md` y `instagram-dm.md`.

Importante: WhatsApp Business mejor que personal. Si superás 50-60 mensajes/día con la cuenta personal, te puede aplicar shadowban. Con Business, la tolerancia es mayor.

**Tarea 4 (30 min): follow-ups del día**

Abrir vista "Follow-up hoy" en Airtable. Para cada prospect en estado `Contactado` con 3 días desde primer contacto, enviar `followup-d3.md`.

Para los de 7 días, enviar `followup-d7.md` y mover a `Descartado` si no respondió.

**Tarea 5 (15 min): responder, agendar, actualizar**

- Bandejas: email, WhatsApp, IG.
- Si alguien quiere call → mandar el link de Cal.com.
- Actualizar `Estado` en Airtable según corresponda.

## 📞 Sales call (cuando alguien agenda)

Antes de la call:
1. Abrir Airtable → ver el lead. Si vino por la landing, ver el score de Gemini y el análisis.
2. Abrir la demo `/demo-inmobiliaria` en una pestaña.
3. Tener listo `sales-call-script.md` y `objections.md` a mano.

Durante la call (15 min): seguir el script. Cerrar con la oferta Pioneer (50 % off setup) si parece serio.

## ✅ Checklist de verificación end-to-end

Antes de empezar el outreach masivo, hacer estos 8 pasos vos mismo:

1. [ ] Abrir en incógnito: `https://cygnusia.com/inmobiliarias?utm_source=test&utm_medium=email&utm_campaign=manual`
2. [ ] Verificar que la copy de inmobiliarias carga (Hero, Servicios SV.02, FAQ específico)
3. [ ] Llenar el formulario con tus datos reales
4. [ ] Verificar en Airtable: lead nuevo + columnas `Niche=inmobiliarias`, `UTM Source=test`, `UTM Medium=email`, `UTM Campaign=manual`
5. [ ] Verificar bandeja: email de confirmación al usuario + email a `hola@cygnusia.com` con score Gemini
6. [ ] Tras `success`, click en "Reservar 15 minutos ahora" → reservar slot test en Cal.com → confirmar que llega notificación
7. [ ] Abrir `https://cygnusia.com/demo-inmobiliaria` desde celular → tipear "¿tienen 3 ambientes en Palermo?" → recibir respuesta razonable
8. [ ] (Opcional) En Vercel Analytics: verificar que la visit aparece con las UTMs

Si los 8 pasos pasan: el sistema está listo. Empezás la operativa diaria al día siguiente.

## 🎯 Métricas a trackear

Semanalmente (domingo a la noche), anotar en una hoja simple:

- Contactos enviados (objetivo: 250-400)
- Replies recibidos (objetivo: 3-5 % = 8-20)
- Demos enviadas via Loom (objetivo: 8-15)
- Calls agendadas en Cal.com (objetivo: 2-6)
- Cerrados (objetivo del mes: 1-2)
- Por canal (email/WA/IG): cuál tiene mejor reply rate
- Por país: dónde respondés más

Si la semana 2 todavía no tenés ninguna call, el problema es la oferta o el opener. Probar `email-cold-v2.md` y revisar `objections.md`.

## 🪙 Oferta "Pioneer Inmobiliario"

Para reducir fricción del primer cierre:
- Primeros 2 clientes: **50 % off setup ($600 en lugar de $1.200)**, mantenimiento normal $200/mes.
- A cambio: testimonio en video al mes 2 + permiso para mencionar marca + 1 reunión de feedback al mes 2.
- Mensaje en outreach: *"Estoy buscando 2 inmobiliarias piloto en [país]. Pago lo mismo, recibís lo mismo, pero al ser pioneros tenés 50 % de descuento en el setup."*

Una vez cerrados los 2 piloto, levantar el precio de vuelta a $1.200 y usar los testimonios en la web.
