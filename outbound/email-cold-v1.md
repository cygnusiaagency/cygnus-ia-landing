# Email cold — v1 (especificidad + demo)

**Asunto:** {{Inmobiliaria}} a las 3 AM

---

Hola {{Nombre}},

Vi que en {{Inmobiliaria}} publicaron {{N}} propiedades sólo este mes en {{Portal}} — tienen un volumen serio.

Una pregunta corta: ¿qué pasa con los WhatsApp que llegan los domingos a la noche, o entre las 22h y las 9h? La mayoría de las inmobiliarias me dicen que ahí pierden entre 30 y 50 % de los leads, porque cuando contestan al otro día el lead ya escribió a otras 3.

Hicimos una demo en vivo del sistema que resuelve eso. Hace 4-6 preguntas como un asesor, califica al lead, y manda el resumen al equipo cuando vale la pena. Probala con cualquier consulta:

→ https://cygnusia.com/demo-inmobiliaria

Si te interesa una así con tus propias propiedades, agendá 15 min acá: https://cygnusia.com/inmobiliarias?utm_source=email&utm_medium=cold&utm_campaign={{campaign_id}}

Gratis los 14 días primeros, sin tarjeta. Si no te ahorra horas, no facturamos.

Pol — Cygnus IA
hola@cygnusia.com

---

## Variables a reemplazar
- `{{Nombre}}`: nombre del responsable (idealmente dueño o gerente comercial). Si no lo tenés, "Equipo de {{Inmobiliaria}}".
- `{{Inmobiliaria}}`: nombre de la inmobiliaria.
- `{{N}}`: cantidad aproximada de propiedades (cuenta rápida en su perfil del portal).
- `{{Portal}}`: Idealista / Zonaprop / Inmuebles24 / etc.
- `{{campaign_id}}`: ej. `inmob-es-madrid-batch1` (país-ciudad-batch).

## Notas operativas
- Enviar desde Gmail con dominio `@cygnusia.com` (o tu personal si no migraste DNS aún).
- Máximo 30-40 emails/día desde la misma cuenta para no quemar el dominio.
- Asunto a pelo, sin emojis, sin "URGENTE", sin mayúsculas. La especificidad ("a las 3 AM") es lo que abre.
- Si el portal no muestra cantidad de propiedades, sustituir por algo concreto que viste en su perfil ("vi que se especializan en zona norte" / "tienen 12 alquileres temporarios activos").
