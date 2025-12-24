import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'abc': '#ff0000',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        // Custom named colors derived from HTML mockups
        'background-dark': '#111a22',
        'surface-dark': '#192633',
        'border-dark': '#324d67',
        'accent-dark': '#233648',
        'text-secondary': '#92adc9',
        'muted-dark': '#16212b',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      gridTemplateColumns: {
        layout: '240px 1fr',
      },
    },
  },
  plugins: [],
};

export default config;
