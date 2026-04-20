/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#f8fafc',
        'surface': 'rgba(255, 255, 255, 0.85)',
        'border': 'rgba(0, 0, 139, 0.08)',
        'text-main': '#0f172a',
        'text-muted': '#475569',
        'accent': {
          primary: '#ffaa00',
          secondary: '#00008b',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #ffaa00 0%, #ff8c00 100%)',
        'accent-secondary-gradient': 'linear-gradient(135deg, #0011cc 0%, #00008b 100%)',
      },
    },
  },
  plugins: [],
}
