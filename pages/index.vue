<template>
  <div class="container">
    <index-tags />
    <index-articles />
  </div>
</template>

<script>
import IndexTags from '~/components/index/tags'
import IndexArticles from '~/components/index/articles'
export default {
  name: 'index',
  components: {
    IndexTags,
    IndexArticles
  },
  head() {
    const title = this.$t('title')
    const description = this.$t('description')
    return this.$seo.head(title, description)
  },
}
</script>