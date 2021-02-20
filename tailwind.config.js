module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        7: '1.75rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
