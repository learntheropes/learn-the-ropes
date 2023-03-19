<template>
  <footer class="footer">
    <div class="level container">
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="content">
            <div class="buttons">
              <b-button v-for="locale in availableLocales" :key="locale.code" tag="nuxt-link" :to="switchLocalePath(locale.code)" class="is-text has-text-primary is-underline-dotted">
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
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  }
}
</script>
