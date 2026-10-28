/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/globals.css",
};
