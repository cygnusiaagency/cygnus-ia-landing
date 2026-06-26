import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces — clinical light
        cream: '#FAFAFA', // subtle clinical grey section
        'cream-deep': '#FFFFFF', // pure white base
        sand: '#F2F0ED', // faint warm tint for chips/fills
        // Text — carbon scale
        ink: '#111111', // primary text / headings
        'ink-soft': '#2E2E2E', // body copy
        warm: '#6B6B6B', // muted meta text
        'warm-soft': '#9A9A9A', // faint labels
        // Brand accent — Rojo Teja (CTAs + small accents only)
        accent: '#D34B32',
        'accent-deep': '#B53C26', // hover/active for buttons
        // Hairlines
        line: 'rgba(17, 17, 17, 0.10)',
        'line-soft': 'rgba(17, 17, 17, 0.06)',
      },
      fontFamily: {
        // Single modern sans-serif system (Inter) for display + body
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
    },
  },
  plugins: [],
} satisfies Config;
