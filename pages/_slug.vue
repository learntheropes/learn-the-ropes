<template>
  <div class="container">
    <blog-post v-if="post" :post="post" />
    <blog-alternatives v-else :alternatives="alternatives" />
  </div>
</template>

<script>
import { locales } from '~/assets/js/locales'
import BlogPost from '~/components/blog/post'
import BlogAlternatives from '~/components/blog/alternatives'
export default {
  components: {
    BlogPost,
    BlogAlternatives
  },
  async asyncData({ $content, params: { slug }, app, error }) {
    const post = await $content(app.i18n.locale, slug, { text: true }).fetch().catch(err => null)
    let alternatives
    if (!post) {
      const getPromise = (code) => {
        return $content(code, slug)
        .only(['path'])
        .fetch()
        .catch(err => ({
          path: `${code}/${slug}`,
          extension: false
        }))
      }
      const promises = locales.filter(locale => locale !== app.i18n.locale).map(locale => getPromise(locale.code))
      const responses = await Promise.all(promises)
      alternatives = responses.filter(response => response.extension)
    }
    if (!post && !alternatives.length) error({ statusCode: 404 })
    return { slug, post, alternatives }
  }
}
</script>
