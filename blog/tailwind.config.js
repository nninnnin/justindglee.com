const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".button": {
          flex: 1,
          padding: "1.25em",
        },
      });
    }),
  ],
};
