export const locales = [
  {
    code: 'en',
    iso: 'en-US',
    file: 'en.js',
    name: 'English',
    flag: '🇺🇸',
    isCatchallLocale: true
  }, 
  {
    code: 'it',
    iso: 'it-IT',
    file: 'it.js',
    name: 'Italiano',
    flag: '🇮🇹'
  }, 
  {
    code: 'es',
    iso: 'es-PY',
    file: 'es.js',
    name: 'Español',
    flag: '🇪🇸',
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

const getPosts = ($content) => {
  const posts = []
  hreflangs.forEach(locale => {
    $content(locale.code)
    .only(['path'])
    .fetch()
    .then(postPaths => {
      postPaths.forEach(post => {
        const slug = post.path.split('/')[2]
        posts.push({
          url: `${locale.code}/${slug}/`,
          links: hreflangs.map((translationLocale) => ({
            lang: translationLocale.iso,
            url: (translationLocale.iso !== 'x-default') ? `${translationLocale.code}/${slug}/` : `/${slug}/`
          }))
        })
      })
    })
  })
  return posts
}

export const getSitemap = ($content) => {

  const statics = getStatics()

  const posts = getPosts($content)

  return Promise.all([statics, posts]).then(values => {
    return [].concat.apply([], values)
  })
}

export const getRoutes = ($content) => {
  const routes = []
  locales.forEach(locale => {
    $content(locale.code)
    .only(['path'])
    .fetch()
    .then(postPaths => {
      postPaths.forEach(post => {
        const slug = post.path.split('/')[2]
        routes.push(`/${locale.code}/${slug}/`)
      })
    })
  })
  return routes
}