/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E0F5FD",
        secondary: "#00BAF2",
        tertiary: "#172B75",
      },
    },
  },
  plugins: [],
};
