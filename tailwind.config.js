/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        /* Section accents */
        pink:    "#f472b6",
        violet:  "#a78bfa",
        cyan:    "#22d3ee",
        green:   "#4ade80",
        orange:  "#fb923c",
        yellow:  "#fbbf24",
      },
      fontFamily: {
        sans:    ["'Space Grotesk'", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
      },
      boxShadow: {
        "pink-glow":   "0 0 40px rgba(244,114,182,0.15)",
        "violet-glow": "0 0 40px rgba(167,139,250,0.15)",
        "cyan-glow":   "0 0 40px rgba(34,211,238,0.15)",
        "green-glow":  "0 0 40px rgba(74,222,128,0.15)",
        "orange-glow": "0 0 40px rgba(251,146,60,0.15)",
        "yellow-glow": "0 0 40px rgba(251,191,36,0.15)",
        "card":        "inset 0 1px 0 rgba(255,255,255,0.06)",
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