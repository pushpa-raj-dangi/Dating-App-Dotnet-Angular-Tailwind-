/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      8: "8px",
    },
    fontFamily: {
      body: ["Poppins"],
    },
    extend: {
      lineHeight: {
        "extra-loose": "2.5",
        "small-loose": "1.4",
        12: "3rem",
      },
    },
  },
  plugins: [],
};
