/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

const postcssConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export { tailwindConfig, postcssConfig };