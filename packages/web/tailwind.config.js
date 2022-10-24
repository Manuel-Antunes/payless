// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('@payless/ui/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
}
