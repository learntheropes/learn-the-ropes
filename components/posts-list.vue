<template>
  <div v-if="posts.length" class="section">
    <h2 class="title is-1">{{ $t('articles') }}</h2>
    <div v-for="post of posts" :key="post.path" class="block">
        <div class="title">
          <nuxt-link :to="localePath({ path: post.path })">
            {{ post.title }}
          </nuxt-link>
        </div>
        <div class="subtitle">
          {{ post.description }}
          <b-tag v-for="tag of post.tags" :key="tag" @click="filterPostsByTeg(tag)" class="is-italic is-white has-text-primary is-medium">
            #{{ tag }}
          </b-tag>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    posts: []
  }),
  async fetch() {
    const posts = await this.$content(this.$i18n.locale)
      .only(['title', 'description', 'tags', 'path'])
      .sortBy('createdAt', 'desc')
      .fetch()

      this.posts = posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${this.$i18n.locale}`, ''),
      }))
  },
  methods: {
    async filterPostsByTeg(tag) {

      const posts = await this.$content(this.$i18n.locale)
      .only(['title', 'description', 'tags', 'path'])
      .where({ tags: { $contains: tag }})
      .sortBy('createdAt', 'desc')
      .fetch()

      this.posts = posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${this.$i18n.locale}`, ''),
      }))
    }
  },
  created() {
    this.$nuxt.$on('emitFilteredPostsByTag', async (tag) => await this.filterPostsByTeg(tag))
  }
}
</script>