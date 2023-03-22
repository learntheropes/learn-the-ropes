<template>
  <footer class="footer">
    <div class="level container">
      <div class="level-left">
        <div class="content">
          <div class="buttons">
            <b-button
              v-for="page in pages"
              :key="page.path"
              tag="nuxt-link"
              :to="localePath({ path: page.path })"
              class="is-text has-text-primary is-underline-dotted"
            >
              {{ page.title }}
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
    pages: []
  }),
  async fetch() {
    const pages = await this.$content( 'pages', this.$i18n.locale)
      .only(['title', 'path'])
      .fetch()

      this.pages = pages.map((page) => ({
        ...page,
        path: page.path.replace(`/${this.$i18n.locale}`, ''),
      }))
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((locale) => locale.code !== this.$i18n.locale)
    }
  }
}
</script>
