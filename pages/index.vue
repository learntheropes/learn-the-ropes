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
  components: {
    IndexTags,
    IndexPosts
  },
  head () {
    const title = `${this.post.title}`
    const description = (this.post.description)
    return this.$seo.head(title, description)
  }
}
</script>