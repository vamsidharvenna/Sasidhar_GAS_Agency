/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: '#0f172a',
        cloud: '#f6f8fc',
        accent: '#0ea5e9',
        energy: '#f97316',
        brandBlue: '#004A99',
        brandRed: '#D31018',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
