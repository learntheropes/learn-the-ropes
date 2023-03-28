<template>
  <div v-if="articles.length" class="section">
    <h2 class="title is-1">{{ $t('articles') }}</h2>
    <div v-for="article of articles" :key="article.path" class="block">
        <div class="title">
          <nuxt-link :to="localePath({ path: article.path })">
            {{ article.title }}
          </nuxt-link>
        </div>
        <div class="subtitle">
          {{ article.description }}
          <b-tag v-for="tag of article.tags" :key="tag" @click="filterArticlesByTag(tag)" class="is-italic is-white has-text-primary is-medium">
            #{{ tag }}
          </b-tag>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    articles: []
  }),
  async fetch() {
    this.articles = await this.$content( this.$i18n.locale, 'articles')
      .only(['title', 'description', 'tags', 'path'])
      .sortBy('createdAt', 'desc')
      .fetch()
  },
  methods: {
    async filterArticlesByTag(tag) {

      this.articles = await this.$content( this.$i18n.locale, 'articles')
      .only(['title', 'description', 'tags', 'path'])
      .where({ tags: { $contains: tag }})
      .sortBy('createdAt', 'desc')
      .fetch()
    }
  },
  created() {
    this.$nuxt.$on('emitFilteredArticlesByTag', async (tag) => await this.filterArticlesByTag(tag))
  }
}
</script>