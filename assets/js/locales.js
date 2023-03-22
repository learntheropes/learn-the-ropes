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

const getPosts = ($content) => {
  const posts = []
  const getPostsByLocale = ($content, locale) => {
    $content('posts', locale.code)
      .only(['path'])
      .fetch()
      .then(postPaths => {
        postPaths
          .forEach(post => {
            const slug = post.path.split('/')[3]
            const obj = {
              url: `${locale.code}/posts/${slug}/`,
              links: [{
                lang: 'x-default',
                url: `posts/${slug}/`
              }]
            }
            const promises = hreflangs.filter(newLocale => newLocale.code !== locale.code && newLocale.iso !== 'x-default').map(newLocale => {
              const exists = $content('posts', newLocale.code, slug)
              .fetch()
              .catch(err => ({
                path: `posts/${newLocale.code}/${slug}/`,
                extension: false
              }))
              return exists         
            })
            Promise.all(promises).then((translationsExists) => {
              translationsExists.filter(translationLocale => translationLocale.extension).forEach((translationLocale) => {
                const code = translationLocale.path.split('/')[2]
                obj.links.push({
                  lang: find(hreflangs, { code: `/${code}` }).iso,
                  url: `${code}/posts/${slug}/`
                })
              })
            })
            posts.push(obj)
          })      
      })
    }
  const promises = locales.map(locale => getPostsByLocale($content, locale))
  return Promise.all(promises).then(() => posts)
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
  const getExistingPostsSlug = ($content, locale) => {
    $content('posts', locale.code)
    .only(['slug'])
    .fetch()
    .then(postsSlug => {
      postsSlug.forEach(post => {
        locales.forEach(newLocale => {
          routes.push(`/${newLocale.code}/posts/${post.slug}/`)
        })
      })
    })
  }
  const promises = locales.map(locale => getExistingPostsSlug($content, locale))
  return Promise.all(promises).then(() => uniq(routes))
}


