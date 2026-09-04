import type { Config } from 'tailwindcss';

// Design tokens ported 1:1 from the original css/style.css :root block.
// Change a value here and it updates everywhere the token is used.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1D33',
        'navy-2': '#122A46',
        slate: '#24405F',
        steel: '#6790B8',
        bg: '#F3F5F7',
        paper: '#FFFFFF',
        ink: '#16202B',
        'ink-soft': '#5B6774',
        amber: '#B8863A',
        'amber-soft': '#F1E4CC',
        line: '#E2E7EC',
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
