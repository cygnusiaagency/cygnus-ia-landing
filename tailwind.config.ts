import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4f1ea',
        'cream-deep': '#ece8df',
        sand: '#e3ddd0',
        ink: '#0d0d0d',
        'ink-soft': '#2a2a28',
        warm: '#6b6560',
        'warm-soft': '#a39d97',
        accent: '#b8341e',
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
