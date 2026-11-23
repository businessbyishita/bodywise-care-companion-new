/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodywise: {
          50: '#F0F7FB',
          100: '#DCEEF7',
          200: '#BDE0F1',
          300: '#8CC7E5',
          400: '#4DA8D5',
          500: '#1A87C1',
          600: '#005995', // Primary brand color
          700: '#00487A',
          800: '#00385F',
          900: '#002742',
          950: '#001728',
        },
        // Harmonize all utility families to pure white and shades of #005995
        cream: {
          50: '#FFFFFF',
          100: '#F0F7FB',
          200: '#E2F0F8',
          300: '#CDE5F3',
          400: '#B0D6EC',
        },
        terracotta: {
          50: '#F0F7FB',
          100: '#DCEEF7',
          200: '#BDE0F1',
          300: '#8CC7E5',
          400: '#4DA8D5',
          500: '#005995',
          600: '#00487A',
          700: '#00385F',
          800: '#002742',
          900: '#001728',
        },
        sage: {
          50: '#F0F7FB',
          100: '#DCEEF7',
          200: '#BDE0F1',
          300: '#8CC7E5',
          400: '#4DA8D5',
          500: '#005995',
          600: '#00487A',
          700: '#00385F',
          800: '#002742',
        },
        charcoal: {
          50: '#F8FAFC',
          100: '#F0F7FB',
          200: '#E2F0F8',
          300: '#CDE5F3',
          400: '#8CC7E5',
          500: '#4DA8D5',
          600: '#00487A',
          700: '#00385F',
          800: '#002742',
          900: '#001728',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(0, 89, 149, 0.06), 0 1px 2px rgba(0, 89, 149, 0.04)',
        'warm': '0 4px 14px -1px rgba(0, 89, 149, 0.08), 0 2px 6px -1px rgba(0, 89, 149, 0.04)',
        'warm-lg': '0 10px 25px -3px rgba(0, 89, 149, 0.12), 0 4px 10px -2px rgba(0, 89, 149, 0.06)',
        'terracotta': '0 6px 20px -2px rgba(0, 89, 149, 0.3)',
      }
    },
  },
  plugins: [],
}
