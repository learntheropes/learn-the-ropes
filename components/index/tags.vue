<template>
  <div class="section">
    <h2 class="title is-1">{{ $t('tags') }}</h2>
    <ul class="columns is-multiline is-mobile">
      <li v-for="tag in tags" :key="tag" class="column is-narrow">
        <b-button @click="emitFilteredPostsByTag(tag)" class="is-primary is-outlined is-italic">#{{ tag }}</b-button>
      </li>
    </ul>
  </div>
</template>

<script>
import flatten from 'lodash.flatten'
import uniq from 'lodash.uniq'
export default {
  data: () => ({
    tags: []
  }),
  async fetch() {

    const posts = await this.$content( 'posts', this.$i18n.locale)
      .only(['tags'])
      .fetch()

    this.tags = uniq(flatten(posts.map(post => post.tags)))
  },
  methods: {
    async emitFilteredPostsByTag(tag) {

      if (process.server) return
      this.$nuxt.$emit('emitFilteredPostsByTag', tag)
    }
  }
}
</script>