/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        InterTight: ['Inter', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
        Objective: ['Objective', 'sans-serif'],
        proxima: ['Proxima Nova', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        ManropeSemiBold: ['Manrope SemiBold', 'sans-serif'],
        monrope: ['Manrope', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 4px 20px 0px #0000001A',
        'custom-right': '2px 0px 10px 0px #00000040',
        'custom-diagonal': '2px 2px 10px 0px #00000040',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE/Edge
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", // Chrome, Safari
        },
        '.vertical-trim': {
          paddingTop: '0.25rem',
          paddingBottom: '0.25rem',
          marginTop: '-0.25rem',
          marginBottom: '-0.25rem',
        },
                      
      });
    },
  ],
 
}

