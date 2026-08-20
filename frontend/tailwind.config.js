/** @type {import('tailwindcss').Config} */
export default {
  // Tells Tailwind which files to scan for class names,
  // so it only generates the CSS you actually use.
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
