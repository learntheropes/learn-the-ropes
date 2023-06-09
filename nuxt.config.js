import { locales, moment, hreflangs, getSitemap, generateRoutes } from './assets/js/locales'
import dotenv from 'dotenv'
dotenv.config()

export default {

  target: 'static',
  ssr: 'true',

  head() {
    const i18nHead = this.$nuxtI18nHead ? this.$nuxtI18nHead({ addSeoAttributes: true }) : {}
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'cr7ts7H-VXD2qwwo3a6LkqYh0iN3eg-t4P7T4tNA5qk'
        },
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
          content: 'Giovanni Lerantheropes'
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
      ],
       link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        ...(i18nHead.link || [])
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
      fullTextSearchFields: [
        'title',
        'description',
        'text'
      ],
      liveEdit: true,
      editor: '~/layouts/editor',
      markdown: {
        rehypePlugins: [
          ['rehype-img-size', {
            dir: 'static'
          }]
        ],
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

    ['@nuxtjs/robots', {
      UserAgent: '*',
      Sitemap: (process.env.URL) ? `https://${process.env.URL}/sitemap.xml` : 'http://localhost:3000/sitemap.xml',
    }],
  ],

  plugins: [
    '~/plugins/moment',
    '~/plugins/markdown-code',
    '~/plugins/seo'
  ],

  serverMiddleware: [
    // '~/serverMiddleware/redirects'
  ],

  generate: {
    crawler: false,
    routes: () => {
      const { $content } = require('@nuxt/content')
      return generateRoutes($content).then(routes => routes)
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

