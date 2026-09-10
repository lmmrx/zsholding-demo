import type { Config } from 'tailwindcss';

// Dark theme design tokens. `navy` and `slate` are reserved for surfaces
// (sidebar, hero panels) — never used as text colors — so their values can
// stay deep without ever landing dark-text-on-dark-background anywhere.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1D33',
        'navy-2': '#122A46',
        slate: '#24405F',
        steel: '#7EA6CC',
        bg: '#111823',
        paper: '#1A2432',
        ink: '#EDF1F5',
        'ink-soft': '#93A1B0',
        amber: '#D7A54D',
        'amber-soft': '#F1E4CC',
        line: '#2B3648',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '14px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(11,29,51,0.05), 0 1px 1px rgba(11,29,51,0.04)',
        md: '0 8px 24px rgba(11,29,51,0.09), 0 2px 6px rgba(11,29,51,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
