import { locales, moment, hreflangs, getSitemap, getRoutes } from './assets/js/locales'
import dotenv from 'dotenv'
dotenv.config()

export default {

  target: "static",
  ssr: "true",

  head() {
    const i18nHead = this.$nuxtI18nHead ? this.$nuxtI18nHead({ addSeoAttributes: true }) : {}
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        {
          charset: 'utf-8'
        },
        {
          hid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          itemprop: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          itemprop: 'og:url',
          content: `https://${process.env.URL}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          itemprop: 'og:site_name',
          content: 'Paraguay XP'
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          itemprop: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'googlebot',
          name: 'googlebot',
          itemprop: 'googlebot',
          content: 'notranslate'
        },
        ...(i18nHead.meta || [])
      ]
    }
  },

  env: {
    URL: process.env.URL
  },

  loading: { color: '#fff' },

  css: [
    '~/assets/scss/main.scss',
    '~/assets/css/mdi.css',
    // '@mdi/font/css/materialdesignicons.css'
  ],

  modules: [

    ['nuxt-buefy', {
      defaultIconPack: 'mdi',
      materialDesignIcons: false,
      materialDesignIconsHRef: '/',
      css: false
    }],

    ['nuxt-content-git'],

    ['@nuxt/content', {
      liveEdit: true,
      editor: '~/layouts/editor',
      markdown: {
        prism: {
          theme: false
        }
      }
    }],

    ['@nuxtjs/i18n', {
      baseUrl: (process.env.URL) ? `https://${process.env.URL}` : 'http://localhost:3000',
      locales: locales,
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_lang',
        fallbackLocale: 'en',
      },
      detectBrowserLanguage: false,
      strategy: 'prefix',
      defaultLocale: 'en',
      lazy: true,
      langDir: 'lang/',
    }],
    
    ['@nuxtjs/moment', {
      timezone: true,
      locales: moment
    }],

    ['@nuxtjs/sitemap', {
      hostname: (process.env.URL) ? `https://${process.env.URL}` : 'http://localhost:3000',
      defaults: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date()
      },
      trailingSlash: true,
      i18n: {
        locales: hreflangs,
        defaultLocale: 'en'
      },
      routes() {
        const { $content } = require('@nuxt/content')
        return getSitemap($content).then(sitemap => sitemap)
      }       
    }],
  ],

  plugins: [
    '~/plugins/moment',
    '~/plugins/markdown-code'
  ],

  serverMiddleware: [
    // '~/serverMiddleware/redirects'
  ],

  // hooks: {
  //   // 'content:file:beforeParse': (file) => {
  //   //   file.data = file.data.replaceAll('↩', 'FOOBAR').replaceAll('U+21A9', 'FOOBAR')
  //   // },
  //   'content:options': (options) => {
  //    // options.markdown.prism.theme = '/assests/scss/prism.scss'
  //     console.log('Content options:', options)
  //   }
  // },

  generate: {
    routes: () => {
      const { $content } = require('@nuxt/content')
      return getRoutes($content).then(routes => routes)
    }
  },

  router: {
    middleware: [
      'redirects'
    ],
    trailingSlash: true,
    options: {
      strict: true,
    }
  }
}