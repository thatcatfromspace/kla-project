/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["index.html", "./src/**/*.{html,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: "'Source Sans 3'",
      },
      colors:{
        primary: "#0C2638",
        primary1:"#1A3545",
        primary2:"#284352",
        gray0:"#284352",
        secondary:"#ffc944",
        tertiary:"#349959",
        gray1:"#B9BBBE",
        gray2:"#DEE5E3",
        gray3:"#F2F1EE",
      },
    },
  },
  plugins: [],
};
