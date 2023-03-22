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
  }
}
</script>