/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      // iPad系で早めにレイアウトを切り替える専用ブレークポイント
      ipad: '834px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        'zb-teal': {
          50: '#e6f7f6',
          100: '#b3e5e1',
          200: '#80d3cc',
          300: '#4dc2b7',
          400: '#26b5a6',
          500: '#00a896',
          600: '#009688',
          700: '#00796b',
          800: '#005c4f',
          900: '#003f34'
        },
        'zb-orange': {
          400: '#ff9a40',
          500: '#ff8a00',
          600: '#e67a00'
        },
        'zb-turquoise': '#70d0c8',
        'zb-navy': '#003f34'
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Yu Gothic"',
          'YuGothic',
          '"Hiragino Kaku Gothic ProN"',
          'Meiryo',
          'sans-serif'
        ]
      },
      animation: {
        // speed x5 (from original 40s -> 8s)
        scroll: 'scroll 8s linear infinite',
        'scroll-reverse': 'scroll-reverse 8s linear infinite',
        // Seamless marquee (single-track, duplicated content)
        marquee: 'marquee 16s linear infinite'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' }
        },
        'scroll-reverse': {
          '0%': { transform: 'translate3d(-50%,0,0)' },
          '100%': { transform: 'translate3d(0,0,0)' }
        },
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          // if ever used, this variant scrolls the whole track
          '100%': { transform: 'translate3d(-50%,0,0)' }
        }
      }
    }
  },
  plugins: []
};
