/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#080808",
        surface: "#111111",
        border:  "#1f1f1f",
        cream:   "#ede8df",
        "cream-dim": "#a89f94",
        muted:   "#555555",
        dim:     "#222222",
      },
      fontFamily: {
        sans:    ["'Space Grotesk'", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
      },
      boxShadow: {
        "cream-glow": "0 0 80px rgba(237,232,223,0.07)",
        "card":       "inset 0 1px 0 rgba(237,232,223,0.06)",
        "card-hover": "inset 0 1px 0 rgba(237,232,223,0.12), 0 0 40px rgba(237,232,223,0.04)",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter:  "-0.03em",
        wide:     "0.15em",
        widest:   "0.25em",
      },
    },
  },
  plugins: [],
}