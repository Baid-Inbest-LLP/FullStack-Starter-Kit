/** @type {import('tailwindcss').Config} */
export default {
  important: '#root',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern:
        /bg-(amber|blue|purple|green|cyan|orange|rose|teal|indigo|pink|gray|red|yellow|emerald|slate|violet|sky)-(50|100|200|300|400|500|600|700)/,
    },
    {
      pattern:
        /text-(amber|blue|purple|green|cyan|orange|rose|teal|indigo|pink|gray|red|yellow|emerald|slate|violet|sky|primary)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(amber|blue|purple|green|cyan|orange|rose|teal|indigo|pink|gray|red|yellow|primary)-(50|100|200|300|400|500|600|700)/,
    },
    { pattern: /from-(amber|blue|purple|green|orange|rose|red|gray|emerald|indigo|slate)-\d+/ },
    { pattern: /to-(amber|blue|purple|green|orange|rose|red|gray|emerald|indigo|slate)-\d+/ },
  ],
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so the theme color can change at runtime (constants/themeColors.js).
        primary: {
          ...Object.fromEntries(
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => [
              shade,
              `rgb(var(--primary-${shade}) / <alpha-value>)`,
            ]),
          ),
          contrast: 'var(--primary-contrast)',
        },
        brand: {
          deep: 'var(--brand-deep)',
          mid: 'var(--brand-mid)',
          light: 'var(--brand-light)',
          on: 'var(--brand-on)',
        },
      },
    },
  },
  plugins: [],
};
