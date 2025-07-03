/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E77B63",

          bgSuccess: "#EDFBD8",
          successText: "#2B641E",
          successIcon: "#84D65A",
          bgError: "#FCE7E7",
          errorText: "#640505",
          errorIcon: "#FF8B8B",
        },
      },
    },
  },
  plugins: [],
};
