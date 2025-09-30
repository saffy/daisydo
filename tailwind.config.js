/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        custom: {
          "primary": "oklch(49.12% 0.3096 275.75)",
          "secondary": "oklch(69.71% 0.329 342.55)",
          "accent": "oklch(76.76% 0.184 183.61)",
          "neutral": "oklch(50.54% 0.046 256.85)",
          "base-100": "oklch(100% 0 0)",
        },
      },
    ],
  },
}