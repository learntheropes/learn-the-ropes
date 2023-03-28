<template>
  <div class="container">
    <section class="section">
      <h1 class="title is-1 has-text-primary">
        {{ folio.title }}
      </h1>
    </section>
    <section class="section">
      <div class="content">
        <nuxt-content :document="folio" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    const title = `${this.folio.title}`
    const description = (this.folio.description)
    return this.$seo.head(title, description)
  },
  async asyncData({ $content, params: { slug }, app, error }) {
    const folio = await $content( app.i18n.locale, 'folios', slug, { text: true })
      .fetch()
      .catch(e => error({ statusCode: 404 }))
    return { folio }
  }
}
</script>s