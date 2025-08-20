// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  srcDir: './src/',
  css: ['~/assets/scss/main.scss'],
  app: {
    buildAssetsDir: '/_nxtsb/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Volunteer Management System',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        },
      ],
    },
  },
  modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  plugins: ['~/plugins/pinia', '~/plugins/toast'],
  primevue: {
    importTheme: { from: '~/assets/theme/theme.js' },
    autoImport: true,
    components: {
      include: ['Button', 'Image', 'Carousel', 'Rating', 'FileUpload', 'Calendar', 'Chips', 'Toast'],
    },
    directives: {
      include: ['Ripple', 'Tooltip', 'FocusTrap'],
    },
    options: {
      ripple: true,
      inputVariant: 'filled',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});