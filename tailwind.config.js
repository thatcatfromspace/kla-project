/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["index.html", "./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: [],
};
