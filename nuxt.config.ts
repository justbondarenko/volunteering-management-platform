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
  plugins: ['~/plugins/pinia'],
  primevue: {
    importTheme: { from: '~/assets/theme/theme.js' },
    autoImport: true,
    components: {
      include: '*'
    },
    directives: {
      include: '*',
    },
    options: {
      ripple: true,
      inputVariant: 'filled',
    },
    locale: {
      dayNames: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота'],
      dayNamesShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNamesMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
      monthNamesShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Груд'],
      today: 'Сьогодні',
      clear: 'Очистити',
      dateFormat: 'dd MM yy',
      weekHeader: 'Тиж',
      firstDayOfWeek: 1,
      chooseYear: 'Вибрати рік',
      chooseMonth: 'Вибрати місяць',
      chooseDate: 'Вибрати дату',
      chooseTime: 'Вибрати час',
      prevYear: 'Попередній рік',
      nextYear: 'Наступний рік',
      prevMonth: 'Попередній місяць',
      nextMonth: 'Наступний місяць',
      prevHour: 'Попередня година',
      nextHour: 'Наступна година',
      prevMinute: 'Попередня хвилину',
      nextMinute: 'Наступна хвилина',
      prevSecond: 'Попередня секунда',
      nextSecond: 'Наступна секунда',
      emptyFilterMessage: 'Результатів не знайдено',
      emptyMessage: 'Немає даних для відображення',
      emptySearchMessage: 'Результатів не знайдено',
      emptySearchResultsMessage: 'Результатів не знайдено',
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});