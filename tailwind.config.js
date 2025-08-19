import tailwindcssTypography from '@tailwindcss/typography';
import PrimeUITailwindPlugin from 'tailwindcss-primeui';

module.exports = {
  content: ['./src/**/*.{js,vue,ts,css,scss}'],
  theme: {
    fontFamily: {
      serif: ['Roboto', 'sans-serif'],
      sans: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [tailwindcssTypography(), PrimeUITailwindPlugin]
};