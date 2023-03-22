export default ({ route, app }, inject) => {

  const BASE_URL = (process.env.URL) ? `https://${process.env.URL}` : 'http://localhost:3000'

  const seo = {
    head: (title, description) => {
      return {
        title: `${title}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            itemprop: 'description',
            content: description
          },
          {
            hid: 'og:title',
            property: 'og:title',
            itemprop: 'og:title',
            content:  title
          },
          {
            hid: 'og:description',
            property: 'og:description',
            itemprop: 'og:description',
            content: description
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: `${BASE_URL}${route.fullPath}`
          },
        ]
      }
    }
  }
  inject('seo', seo)
}