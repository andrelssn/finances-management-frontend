/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0D",
        panel: "#141416",
        blueApp: "#3A9CFF",
        redApp: "#E63946",
        inputBg: "#1C1C1F",
        inputBorder: "#2A2A2E",
        text: "#EDEDED",
        textSecondary: "#9C9C9C",
        theme: "#2D9F00",
        themeDark: "#296d0e",
      },
    },
  },
  plugins: [],
};
