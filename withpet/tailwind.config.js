/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FAEFE9',
          200: '#F6615A',
          300: '#FF0101',
          400: '#B10E07',
        },
        Gray: {
          100: '#FAFAFA',
          200: '#D9D9D9',
          300: '#A8A8A8',
          400: '#6A696B',
          500: '#AFA8A4',
          600: '#4D4D4D',
          700: '#555353',
          800: '#EEEEEE',
          900: '#5F5654',
        },
        contentText: '#212121',
        Air: {
          100: '#2C75BA',
          200: '#2899D5',
          300: '#15ADC2',
          400: '#349043',
          500: '#F68E1F',
          600: '#E64D23',
          700: '#D42E30',
          800: '#212121',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.75rem',
      },
      width: {
        8.9: '2.1875rem',
        18: '4.62125rem',
        69: '17.0625rem',
        85: '21.4375rem',
      },
      maxWidth: {
        scr: '31.25rem',
      },
      height: {
        8.9: '2.1875rem',
        13: '3.125rem',
        39: '9.8125rem',
      },
      boxShadow: {
        100: '5px 5px rgb(0,0,0)',
        150: '3px 3px 4px rgba(0,0,0,0.25)',
        200: '3px 3px 4px 0 rgba(0,0,0,0.5)',
        300: '5px 5px 4px rgb(0,0,0)',
      },
      backgroundImage: {
        sprites_icon: "url('../../assets/sprites_icon.png')",
      },
      lineHeight: {
        12: '3.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
