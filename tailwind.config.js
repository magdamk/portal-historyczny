require('dotenv').config();
const optymalizuj = process.env.OPTYMALIZUJ_CSS ? (process.env.OPTYMALIZUJ_CSS == 'false' ? false : true) : false
console.log('OPTYMALIZUJ_CSS', optymalizuj);
module.exports = {
  purge: {
    enabled: optymalizuj,
    options: {
      safelist: ["pb-8", "pt-12", "w-1/3", "ml-2"]
    },
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      width: {
        inherit: 'inherit'
      }
    },
    screens: {
      'um-desktop': '900px',
      'um-desktop-s': '1367px',
      'um-desktop-m': '1600px',
      'um-desktop-l': '1920px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
