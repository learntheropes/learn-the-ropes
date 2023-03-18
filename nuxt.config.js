import { locales, moment, hreflangs, getSitemap, getRoutes } from './assets/js/locales'
import dotenv from 'dotenv'
dotenv.config()

export default {

  target: "static",
  ssr: "true",

  head() {
    // const i18nHead = this.$nuxtI18nHead ? this.$nuxtI18nHead({ addSeoAttributes: true }) : {}
    return {
      // htmlAttrs: {
      //   ...i18nHead.htmlAttrs
      // },
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
          hid: 'og:image',
          property: 'og:image',
          itemprop: 'og:image',
          content: `https://${process.env.URL}/logo.webp`
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          itemprop: 'og:image:width',
          content: '225'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          itemprop: 'og:image:height',
          content: '225'
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          itemprop: 'og:image:type',
          content: 'image/webp'
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          itemprop: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          itemprop: 'twitter:image:src',
          content: `https://${process.env.URL}/logo.webp`
        },
        {
          hid: 'geo.region',
          name: 'geo.region',
          itemprop: 'geo.region',
          content: 'Paraguay'
        },
        {
          hid: 'geo.placename',
          name: 'geo.placename',
          itemprop: 'geo.placename',
          content: 'Asunción'
        },
        {
          hid: 'googlebot',
          name: 'googlebot',
          itemprop: 'googlebot',
          content: 'notranslate'
        },
        // ...i18nHead.meta
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        // ...i18nHead.link
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
      liveEdit: false
    }],

    ['@nuxtjs/i18n', {
      baseUrl: `https://${process.env.URL}`,
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
        return getSitemap($content)
      },
      exclude: [
        '**'
      ],        
    }],
  ],

  plugins: [
    '~/plugins/moment'
  ],

  serverMiddleware: [
    '~/serverMiddleware/redirects'
  ],

  generate: {
    routes: () => {
      const { $content } = require('@nuxt/content')
      return getRoutes($content)
    }
  },

  router: {
    trailingSlash: true,
    options: {
      strict: true,
    }
  }
}