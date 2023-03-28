<template>
  <footer class="footer">
    <div class="level container">
      <div class="level-left">
        <div class="level-item">
          <div class="content">
            <div class="buttons">
              <b-button
                tag="nuxt-link"
                :to="localePath({ name: 'index' })"
                class="is-text has-text-primary is-underline-dotted"
              >
              {{ $t('home') }}
              </b-button>
              <b-button
                v-for="folio in folios"
                :key="folio.path"
                tag="nuxt-link"
                :to="localePath({ path: folio.path })"
                class="is-text has-text-primary is-underline-dotted"
              >
                {{ folio.title }}
              </b-button>
            </div>
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
    folios: []
  }),
  async fetch() {
    this.folios = await this.$content( this.$i18n.locale, 'folios')
      .only(['title', 'path'])
      .fetch()
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((locale) => locale.code !== this.$i18n.locale)
    }
  }
}
</script>
