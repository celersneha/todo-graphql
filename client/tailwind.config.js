/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fairy-purple": "#a163f7",
        "fairy-blue": "#6f88fc",
        "fairy-cyan": "#45e3ff",
        "fairy-cream": "#fff5e2",
        "fairy-dark": "#2c3e50",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 5s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-delayed": "twinkle 3s ease-in-out 1s infinite",
        "twinkle-slow": "twinkle 4s ease-in-out 2s infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(1.1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
