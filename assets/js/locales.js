import find from 'lodash.find'
import uniq from 'lodash.uniq'
export const locales = [
  {
    code: 'en',
    iso: 'en-US',
    file: 'en.js',
    name: 'English',
    isCatchallLocale: true
  }, 
  {
    code: 'it',
    iso: 'it-IT',
    file: 'it.js',
    name: 'Italiano',
  }, 
  {
    code: 'es',
    iso: 'es-ES',
    file: 'es.js',
    name: 'Español',
  }, 
]

export const moment = [
  'it',
  'es'
]

export const hreflangs = [
  ...locales.map(locale => ({ code: `/${locale.code}`, iso: locale.code })),
  ...[{ code: '/', iso: 'x-default' }]
]

const getStatics = () => {
  const statics = hreflangs.filter(locale => locale.code !== '/').map(locale => locale.code.replace('/', ''))
  statics.forEach((endpoint) => {
    hreflangs.forEach((locale) => {
      statics.push({
        url: `${locale.code}/`,
        links: hreflangs.map((translationLocale) => ({
          lang: translationLocale.iso,
          url: (translationLocale.iso !== 'x-default') ? `${translationLocale.code}/` : ''
        }))
      })
    })
  })
  return statics
}

const getDinamicRoutes = ($content, folder) => {
  const routes = []
  const getRoutesByLocale = ($content, locale) => {
    $content(folder, locale.code)
      .only(['path'])
      .fetch()
      .then(routesByLocale => {
        routesByLocale
          .forEach(route => {
            const slug = route.path.split('/')[3]
            const obj = {
              url: `${locale.code}/${folder}/${slug}/`,
              links: [{
                lang: 'x-default',
                url: `${folder}/${slug}/`
              }]
            }
            const promises = hreflangs.filter(newLocale => newLocale.code !== locale.code && newLocale.iso !== 'x-default').map(newLocale => {
              const exists = $content(folder, newLocale.code, slug)
              .fetch()
              .catch(err => ({
                extension: false
              }))
              return exists         
            })
            Promise.all(promises).then((translationsExists) => {
              translationsExists.filter(translationLocale => translationLocale.extension).forEach((translationLocale) => {
                const code = translationLocale.path.split('/')[2]
                obj.links.push({
                  lang: find(hreflangs, { code: `/${code}` }).iso,
                  url: `${code}/${folder}/${slug}/`
                })
              })
            })
            routes.push(obj)
          })      
      })
    }
  const promises = locales.map(locale => getRoutesByLocale($content, locale))
  return Promise.all(promises).then(() => routes)
}

export const getSitemap = ($content) => {
  const statics = getStatics()
  const posts = getDinamicRoutes($content, 'posts')
  const pages = getDinamicRoutes($content, 'pages')
  return Promise.all([statics, posts, pages]).then(values => {
    return [].concat.apply([], values)
  })
}

const generateRoutesByFolder = ($content, folder) => {
  const routes = []
  const getSlugs = ($content, locale) => {
    $content(folder, locale.code)
    .only(['slug'])
    .fetch()
    .then(slugs => {
      slugs.forEach(({slug}) => {
        routes.push(`/${locale.code}/${folder}/${slug}/`)
      })
    })
  }
  const promises = locales.map(locale => getSlugs($content, locale))
  return Promise.all(promises).then(() => uniq(routes))
}

export const generateRoutes = ($content) => {
  const posts = generateRoutesByFolder($content, 'posts')
  const pages = generateRoutesByFolder($content, 'pages')
  return Promise.all([posts, pages]).then(values => {
    return [].concat.apply([], values)
  })
}


