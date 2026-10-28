/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/globals.css",
};

export default config;
