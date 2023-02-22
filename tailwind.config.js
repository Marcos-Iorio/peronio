/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        neon: {
          "0%": {
            boxShadow: "0px 0px 30px 5px rgb(0, 183, 194)"
          },
          "50%": {
            boxShadow: "0px 1ox 45px 5px rgb(0, 183, 194)"
          }
        }
      },
      animation: {
        neon: "neon 3s linear infinite"
      },
      boxShadow: {
        "modal-button": "0px 0px 30px 5px rgba(253,204,159,1)",
        "modal-button-hover": "0px 0px 30px 10px rgba(253,204,159,1)",
        "wizard-button": "0px 0px 15px 1px rgb(0, 183, 194)"
      },
      fontFamily: {
        Roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        Abril: ["Abril Fatface", ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        sol: "url('/public/sol-bg.svg')"
      }
    },
    screens: {
      mobile: "320px",
      xl: "1280px",
      "2xl": "1500px",
      laptop: "1024px",
      md: "768px"
    }
  },

  plugins: [],
  corePlugins: {
    fontFamily: true
  }
};
