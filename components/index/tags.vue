<template>
  <div class="section">
    <h2 class="title is-1">{{ $t('tags') }}</h2>
    <ul class="columns is-multiline is-mobile">
      <li v-for="tag in tags" :key="tag" class="column is-narrow">
        <b-button @click="emitFilteredArticlesByTag(tag)" class="is-primary is-outlined is-italic">#{{ tag }}</b-button>
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

    const articles = await this.$content( this.$i18n.locale, 'articles')
      .only(['tags'])
      .fetch()

    this.tags = uniq(flatten(articles.map(article => article.tags)))
  },
  methods: {
    async emitFilteredArticlesByTag(tag) {

      if (process.server) return
      this.$nuxt.$emit('emitFilteredArticlesByTag', tag)
    }
  }
}
</script>