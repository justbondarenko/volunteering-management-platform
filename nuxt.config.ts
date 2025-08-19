// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "./src/",
  css: ["~/assets/scss/main.scss"],
  app: {
    buildAssetsDir: "/_nxtsb/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Vadym Income Tracker",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
  ],
  primevue: {
    components: {
      include: ["Button"],
    },
    directives: {
      include: ["Ripple", "Tooltip", "FocusTrap"],
    },
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Aura,
      },
    },
  },
  tailwindcss: {
    cssPath: ["~/assets/scss/main.scss", { injectPosition: "first" }],
    config: {},
  },
});
