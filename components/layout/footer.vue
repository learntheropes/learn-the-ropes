<template>
  <footer class="footer">
    <div class="level container">
      <div class="level-left">
        <div class="content">
          <div class="buttons">
            <b-button
              v-for="post in posts"
              :key="post.path"
              tag="nuxt-link"
              :to="localePath({ path: post.path })"
              class="is-text has-text-primary is-underline-dotted"
            >
              {{ post.title }}
            </b-button>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="content">
            <div class="buttons">
              <b-button
                v-for="locale in availableLocales"
                :key="locale.code"
                tag="nuxt-link"
                :to="switchLocalePath(locale.code)"
                class="is-text has-text-primary is-underline-dotted"
              >
              {{ locale.name }}
            </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    posts: []
  }),
  async fetch() {
    const posts = await this.$content( 'pages', this.$i18n.locale)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()

      this.posts = posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${this.$i18n.locale}`, ''),
      }))
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((locale) => locale.code !== this.$i18n.locale)
    }
  }
}
</script>
