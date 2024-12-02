/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms, daisyui],
};
