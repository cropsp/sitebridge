/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      aspectRatio: {
        pin: '2 / 3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
