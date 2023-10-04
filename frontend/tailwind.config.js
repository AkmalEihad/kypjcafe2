/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'Gkypj': 'url(C:\Users\eihad\Downloads\kypjdariatas.jpg)'
      },
      screens:{
        'widescreen': {'raw': '(min-aspect-ratio: 3/2)'}, 
        'tallscreen': {'raw': '(min-aspect-ratio: 13/20)'}, 
        'tallscreenMax': {'raw': '(max-aspect-ratio: 13/20)'}, 
      },
      fontFamily: {
        Poppins: ['Poppins'],
        Rubik: ['Rubik']
      },
    },
  },
  plugins: [require('daisyui')],
}

