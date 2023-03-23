<template>
  <div class="container">
    <index-tags />
    <index-posts />
  </div>
</template>

<script>
import IndexTags from '~/components/index/tags'
import IndexPosts from '~/components/index/posts'
export default {
  name: 'index',
  components: {
    IndexTags,
    IndexPosts
  },
  head() {
    const title = this.$t('title')
    const description = this.$t('description')
    return this.$seo.head(title, description)
  },
}
</script>