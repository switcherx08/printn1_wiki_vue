const DaisyPlugin = require("daisyui")

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    DaisyPlugin
  ],
  daisyui: {
    styled: true,
    base: false,
    utils: true,
    logs: false,
    themes: [
      {
        mytheme: {
          "primary": "#73abfe",
          "secondary": "#F000B8",
          "accent": "#37CDBE",
          "neutral": "#f7f7f7",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
}
