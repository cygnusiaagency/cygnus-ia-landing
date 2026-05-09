# Cygnus IA — Landing Page

Landing page de producción para **Cygnus IA**, agencia de automatización con IA dirigida a PyMEs en LATAM y España.

## Stack

- **React 18** + **TypeScript** — componentes tipados
- **Vite 5** — bundler ultrarrápido
- **Tailwind CSS 3.4** — utilidades de diseño con tokens personalizados
- **Framer Motion 11** — animaciones declarativas con soporte `prefers-reduced-motion`
- **Lucide React** — iconos: ArrowRight, Plus, Mail

## Setup rápido

```bash
npm install
npm run dev
```

La app corre en `http://localhost:5173`.

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para subir a **Hostinger**, **Vercel**, **Netlify** o cualquier hosting estático.

## Video del Hero

El hero soporta un fondo de video MP4. Para activarlo:

1. Copiá `.env.example` a `.env`
2. Completá la variable:

```
VITE_HERO_VIDEO_URL=https://tu-cdn.com/hero.mp4
```

Si la variable está vacía, se renderiza automáticamente un **canvas con partículas** (constelación Cygnus).

## Formulario de contacto

El formulario en `FinalCTA.tsx` actualmente hace `console.log` del email capturado. Para conectar un backend real, buscá el comentario `// TODO` en ese archivo y reemplazá con tu integración (Formspree, Netlify Forms, API propia).

## Tokens de diseño

Todos los colores y tipografías están centralizados en `tailwind.config.ts`:

| Token | Valor | Uso |
|-------|-------|-----|
| `cream` | `#f4f1ea` | Fondo principal |
| `cream-deep` | `#ece8df` | Fondo sección Oferta |
| `ink` | `#0d0d0d` | Texto principal, fondos oscuros |
| `accent` | `#b8341e` | CTAs, acentos, highlights |
| `warm` | `#6b6560` | Texto secundario |
| `font-display` | Fraunces | Títulos editoriales |
| `font-sans` | Manrope | Cuerpo de texto |
| `font-mono` | JetBrains Mono | Etiquetas, códigos |

## Estructura de archivos

```
src/
├── components/     # Componentes de sección
├── data/          # Arrays tipados (problems, services, steps, faq)
├── hooks/         # useCountUp para contadores animados
└── lib/           # Variantes compartidas de Framer Motion
```
