/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../ui/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
};
