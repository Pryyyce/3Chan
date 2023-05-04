/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      gray: colors.coolGray,
      'bGround': '#111827',
      'baseObj':'#1f2937',
      'baseObj2':'#374151',
      'darkText':'#374F80',
      'lightText':'#5071B4',
      

    },
    screens: {
      thd: '235px',
      sm: '600px',
      md: '728px',
      lg: '984px',
      xl: '1240px',
      '2xl': '1496px',
    },
    extend: {},
  },
  plugins: [],
}

