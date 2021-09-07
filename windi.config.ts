const defaultTheme = require('windicss/defaultTheme')
const colors = require('windicss/colors')
const svgToDataUri = require('mini-svg-data-uri')
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}', 'node_modules/tv-*/dist/tv-*.umd.min.js'],
    exclude: ['node_modules', '.git'],
  },
  safelist: ['prose', 'prose-sm', 'm-auto', 'thin-scroll'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fill: (theme) => theme('colors'),
    stroke: (theme) => theme('colors'),
    container: {
      center: true,
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    minHeight: (theme) => ({
      0: '0',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    extend: {
      transitionProperty: {
        spacing: 'padding',
        search: 'padding box-shadow',
      },
      zIndex: {
        '1000': '1000',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        amber: colors.amber,
        rose: colors.rose,
        warnGray: colors.warmGray,
        trueGray: colors.trueGray,
        emerald: colors.emerald,
      },
      boxShadow: {
        search: '0 35px 60px -15px rgba(0, 0, 0, 0.5)',
      },
      gridTemplateColumns: {
        'book-card': 'repeat(auto-fill, minmax(248px, 1fr))',
        'book': 'repeat(auto-fill, minmax(150px, 1fr))',
        'organizations': 'repeat(auto-fill, minmax(120px, 1fr))',
        'shelf-card': 'repeat(auto-fill,minmax(260px,1fr))'
      },
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`,
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme(
            'colors.green.500',
          )}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`,
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
        )}")`,
      }),
      typography: (theme) => ({
        light: {
          css:
          {
            color: theme('colors.trueGray.100'),
            '[class~="lead"]': {
              color: theme('colors.trueGray.50'),
            },
            a: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.trueGray.50'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
            },
            blockquote: {
              color: theme('colors.gray.200'),
              borderLeftColor: theme('colors.gray.600'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.white'),
            },
            'a code': {
              color: theme('colors.white'),
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            thead: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.gray.400'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.600'),
            },
          },

        },
      }),
    },
  },
  variants: {
    extend: {
      // @ts-ignore
      typography: ['dark'],
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/typography')({
      modifiers: [],
    }),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp'),
  ],
})
