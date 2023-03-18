import { locales, moment, hreflangs, getSitemap, getRoutes } from './assets/js/locales'
import dotenv from 'dotenv'
dotenv.config()

export default {

  target: "static",
  ssr: "true",

  head() {
    const i18nHead = this.$nuxtI18nHead ? this.$nuxtI18nHead({ addSeoAttributes: true }) : {}
    console.log('i18nHead.meta', i18nHead.meta)
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
      }       
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