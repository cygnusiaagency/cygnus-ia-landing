import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAFA',
        'cream-deep': '#FFFFFF',
        sand: '#e3ddd0',
        ink: '#111111',
        'ink-soft': '#2a2a28',
        warm: '#6b6560',
        'warm-soft': '#a39d97',
        accent: '#D34B32',
        line: 'rgba(13, 13, 13, 0.12)',
        'line-soft': 'rgba(13, 13, 13, 0.06)',
      },
      fontFamily: {
        display: ['Fraunces', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
