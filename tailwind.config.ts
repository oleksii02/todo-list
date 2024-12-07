/* eslint-disable @typescript-eslint/no-require-imports */
const plugin = require('tailwindcss/plugin');
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      boxShadow: {
        custom: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      },
      colors: {},
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: false,
      prefix: 'nextui',
      layout: {
        disabledOpacity: '1',
      },
      themes: {
        light: {
          colors: {
            primary: {
              foreground: '#ffffff',
              DEFAULT: '#155EEF',
            },
            danger: {
              foreground: '#ef1515',
              DEFAULT: '#ef1515',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: '#ffffff',
              DEFAULT: '#155EEF',
            },
          },
        },
      },
    }),
  ],
};
