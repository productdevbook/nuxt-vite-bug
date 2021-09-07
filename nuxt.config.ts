
import type { NuxtConfig } from '@nuxt/types'


const config: NuxtConfig = {


  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  telemetry: false,
  components: true,
  css: ['~/assets/styles/tailwind.css'],
  head: {
    title: 'aaaa',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1 , height=device-height',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'test',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    ],
  },

  loading: {
    color: '#00A4DC',
    failedColor: '#FF5252',
    height: '8px',
  },
  buildModules: [
    'nuxt-vite',
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa',
    'nuxt-use-motion',
    '@nuxtjs/date-fns',
    ['@pinia/nuxt', { disableVuex: false }],
  ],

  vite: {
    optimizeDeps: {
      exclude: [
        'date-fns',
      ]
    },
    ssr: true,
    vue: {
      include: [/\.vue$/, /\.md$/],
    },
  },

  modules: [
    '@nuxtjs/auth-next',
    [
      'nuxt-tailvue',
      {
        toast: {
          defaults: {
            containerClasses: [
              'z-[500]',
              'fixed',
              'inset-0',
              'flex',
              'top-0',
              'px-4',
              'py-6',
              'pointer-events-none',
              'sm:p-6',
              'sm:items-end',
              'sm:justify-end',
            ],
          },
        },
      },
    ],
    '@nuxtjs/axios',
    ['@nuxtjs/i18n', { vueI18nLoader: true }],
    '@nuxtjs/sentry',
    'nuxt-viewport',
    '@nuxt/image',
    '@nuxtjs/apollo',
    '@nuxtjs/universal-storage'
  ],
  build: {
    transpile: ['vee-validate/dist/rules', 'vue', 'vue-final-modal', '@vue/apollo-composable', '@nuxtjs/auth'],
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        'tailwindcss': {},
        'autoprefixer': {},
      }
    }
  },


  vue: {
    config: {
      devtools:
        process.env.NODE_ENV === 'development' ||
        process.env.DEVTOOLS === 'true',
      productionTip: false,
    },
  },
  plugins: [
    '~/plugins/filters.ts',
    '~/plugins/truncate.ts',
    '~/plugins/debounce.ts',
    '~/plugins/timeUtils.ts',
    '~/plugins/v-emoji-picker.ts',
    '~/plugins/v-tooltip.ts',
    '~/plugins/axios.ts',
    '~/plugins/vue-tailwind-color-picker.ts',
    { src: '~/plugins/vueform.ts', ssr: true },
    '~/plugins/vue-trend-chart.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/vueDraggable.ts',
    { src: '~/plugins/filepond.ts', ssr: false },
    '~/plugins/persistedState.client.ts',
    '~/plugins/heightView.ts',
    '~/plugins/vue-final-modal.ts',
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    '~/plugins/apollo/apollo-composable.ts',
    '~/plugins/i18n.ts'
  ],
  pwa: {
    icon: {
      source: "/icon.png"
    },
    manifest: {
      name: 'test',
      short_name: 'test',
      lang: 'en',
    },
  },
  i18n: {
    lazy: true,
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en_US.json',
      },
      {
        code: 'tr',
        name: 'Turkish',
        iso: 'tr-TR',
        file: 'tr_TR.json',
      },
    ],
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/home'
    },
    strategies: {
      okuStrategy: {
        scheme: '~/plugins/apollo/graphqlScheme.ts',
        token: {
          required: true,
          property: 'accessToken',
          maxAge: 3500,
          global: true,
        },
        refreshToken: {
          property: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30,
          required: true,
          tokenRequired: true
        },
        autoLogout: true
      },
    },
    // @ts-ignore
    token: {
      global: true
    }
  },
  server: {
    host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
    port: process.env.NODE_ENV === 'production' ? '3000' : '3000',
  },
  axios: {
    baseURL: process.env.GRAPHQL_ENDPOINT
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo/config.ts',
    }
  },

  publicRuntimeConfig: {
    graphQlEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql',
    stage: process.env.TARGET_STAGE || 'dev',
  },
}

export default config
