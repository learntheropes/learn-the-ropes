<template>
  <div>
    <section class="section">
      <h1 class="title is-1 has-text-primary">
        {{ article.title }}
      </h1>
      <div class="subtitle is-5">
        {{ article.description }}
      </div>
      <div class="block is-italic">
        {{$t('published')}} {{ $moment(article.createdAt).fromNow() }} 
        <span v-if="isUpdated">
          <br class="is-hidden-tablet">
          <span class="is-hidden-mobile"> | </span>
          {{$t('updated')}} {{ $moment(article.updatedAt).fromNow() }}
        </span>
      </div>
    </section>
    <article-toc :toc="article.toc" />
    <section class="section">
      <div class="content">
        <nuxt-content :document="article" />
      </div>
    </section>
  </div>
</template>

<script>
import ArticleToc from '~/components/articles/toc'
export default {
  components: {
    ArticleToc
  },
  props: [
    'article'
  ],
  computed: {
    isUpdated() {
      return this.article.createdAt !== this.article.updatedAt
    }
  }
}
</script>