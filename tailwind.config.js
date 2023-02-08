/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};
