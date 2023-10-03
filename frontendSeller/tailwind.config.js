/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'widescreen': {'raw': '(min-aspect-ratio: 3/2)'}, 
        'tallscreen': {'raw': '(min-aspect-ratio: 13/20)'}, 
        'tallscreenMax': {'raw': '(max-aspect-ratio: 13/20)'}, 
      },
      fontFamily: {
        Poppins: ['Poppins']
      },
    },
  },
  plugins: [require('daisyui')],
}

