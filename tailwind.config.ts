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
      borderWidth: {
        6: '6px',
      },
      boxShadow: {
        custom: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      },
      colors: {
        tertiary: 'var(--tertiary)',
        'primary-text': 'var(--primary)',
        'secondary-fg': 'var(--secondary-fg)',
        'button-tertiary': 'var(--button-tertiary)',
        'brand-primary': 'var(--brand-primary)',
        quinary: 'var(--fg-quinary)',
        'secondary-border': 'var(--secondary-border)',
        error: 'var(--error)',
        danger: 'var(--error-border)',
        'error-border': 'var(--error-border)',
        'light-gray': 'var(--light-gray)',
        'light-green': 'var(--light-green)',
        'light-yellow': 'var(--light-yellow)',
        'light-blue': 'var(--light-blue)',
        'alert-secondary': 'var(--alert-secondary)',
        'popup-black': 'var(--popup-black)',
        'back-gray': 'var(--back-gray)',
        secondary: 'var(--secondary)',
        'light-gray-border': 'var(--light-gray-border)',
      },
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
