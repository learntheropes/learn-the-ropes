<template>
  <div class="container">
    <tags-list />
    <posts-list />
  </div>
</template>

<script>
import TagsList from '~/components/tags-list'
import PostsList from '~/components/posts-list'
export default {
  components: {
    TagsList,
    PostsList
  }
}
</script>