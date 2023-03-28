<template>
  <div class="container">
    <article-content v-if="article" :article="article" />
    <article-sandbox v-if="article && article.sandbox" :src="article.sandbox" />
    <article-alternatives v-else :alternatives="alternatives" />
  </div>
</template>

<script>
import { locales } from '~/assets/js/locales'
import ArticleContent from '~/components/articles/content'
import ArticleSandbox from '~/components/articles/sandbox'
import ArticleAlternatives from '~/components/articles/alternatives'
export default {
  components: {
    ArticleContent,
    ArticleSandbox,
    ArticleAlternatives
  },
  head() {
    if (this.article) {
      const title = `${this.article.title}`
      const description = (this.article.description)
      return this.$seo.head(title, description)
    }
  },
  async asyncData({ $content, params: { slug }, app, error }) {
    const article = await $content( app.i18n.locale, 'articles', slug, { text: true }).fetch().catch(err => null)
    let alternatives
    if (!article) {
      const getPromise = (localeCode) => {
        return $content(localeCode, 'articles', slug)
        .fetch()
        .catch(err => ({
          extension: false
        }))
      }
      const promises = locales.filter(locale => locale.code !== app.i18n.locale).map(locale => getPromise(locale.code))
      const responses = await Promise.all(promises)
      alternatives = responses.filter(response => response.extension)
    }
    if (!article && !alternatives.length) error({ statusCode: 404 })
    return { slug, article, alternatives }
  }
}
</script>
