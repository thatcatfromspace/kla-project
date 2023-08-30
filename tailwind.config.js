/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["index.html", "./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Source Sans 3'",
      },
    },
  },
  plugins: [],
};
