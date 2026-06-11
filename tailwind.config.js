/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-indigo': '#3730a3',
        'on-surface': '#1a1c1d',
        'on-surface-variant': '#464555',
        'surface': '#f9f9fa',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f3f4',
        'surface-container': '#eeeeef',
        'surface-container-high': '#e8e8e9',
        'surface-container-highest': '#e2e2e3',
        'outline': '#777587',
        'outline-variant': '#c7c4d8',
        'primary': '#3525cd',
        'primary-fixed': '#e2dfff',
        'primary-fixed-dim': '#c3c0ff',
        'primary-container': '#4f46e5',
        'on-primary': '#ffffff',
        'error': '#ba1a1a',
        'inverse-surface': '#2f3132',
        'inverse-on-surface': '#f0f1f2',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '9999px',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        'gutter': '24px',
        'margin-desktop': '40px',
        'container-max': '1280px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
