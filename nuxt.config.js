import { locales, localeCodes, defaultLocale } from './assets/js/modules/i18n'
const baseUrl = (process.env.URL) ? `https://${process.env.URL}` : 'http://localhost:3000'

export default defineNuxtConfig({

  target: 'static',
  ssr: 'true',

  css: [
    'assets/scss/main.scss'
  ],

  pages: true,

  components: [{
    path: '~/components',
    pathPrefix: false
  }],

  modules: [
    [ '@nuxtjs/i18n', {
      locales,
      defaultLocale,
      lazy: true,
      langDir: 'lang',
      strategy: 'prefix',
      vueI18n: {
        baseUrl,
        detectBrowserLanguage: {
          redirectOn: 'root',
        }
      }
    }],

    [ '@nuxt/content', {
      locales: localeCodes,
      defaultLocale,
      documentDriven: true,
      fullTextSearchFields: [
        'title',
        'description',
        'text'
      ],
      liveEdit: true,
      highlight: {
        preload: [
          'bash'
        ]
      }
      // editor: '~/layouts/editor',
      // markdown: {
      //   rehypePlugins: [
      //     ['rehype-img-size', {
      //       dir: 'static'
      //     }]
      //   ],
      //   prism: {
      //     theme: false
      //   }
      // }
    }]

  ],

  // build: {
  //   babel: {
  //     compilerOptions: {
  //       isCustomElement: tag => tag.startsWith('o-')
  //     }
  //   }
  // },

  router: {
    options: {
      // trailingSlash: true,
      // equivalent to trailingSlash in nuxt2 
      // strict: true
    }
  },
})