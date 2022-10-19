// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('@payless/ui/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
}
