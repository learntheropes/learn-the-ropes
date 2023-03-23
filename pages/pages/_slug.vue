<template>
  <div class="container">
    <section class="section">
      <h1 class="title is-1 has-text-primary">
        {{ page.title }}
      </h1>
    </section>
    <section class="section">
      <div class="content">
        <nuxt-content :document="page" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    const title = `${this.page.title}`
    const description = (this.page.description)
    return this.$seo.head(title, description)
  },
  async asyncData({ $content, params: { slug }, app, error }) {
    const page = await $content( 'pages', app.i18n.locale, slug, { text: true })
      .fetch()
      .catch(e => error({ statusCode: 404 }))
    return { page }
  }
}
</script>s