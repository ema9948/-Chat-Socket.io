/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "red": "#450303"
      },
      boxShadow: {
        "Neumorphism": "23px 23px 46px #439cfb, -23px -23px 46px #f187fb"
      },
      maxWidth: {
        "texto": "80%"
      }
    },
  },
  plugins: [],
}
