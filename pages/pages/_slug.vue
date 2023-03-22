<template>
  <div class="container">
    <section class="section">
      <h1 class="title is-1 has-text-primary">
        {{ post.title }}
      </h1>
    </section>
    <section class="section">
      <div class="content">
        <nuxt-content :document="post" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head () {
    const title = `${this.post.title}`
    const description = (this.post.description)
    return this.$seo.head(title, description)
  },
  async asyncData({ $content, params: { slug }, app, error }) {
    const post = await $content( 'pages', app.i18n.locale, slug, { text: true })
      .fetch()
      .catch(e => error({ statusCode: 404 }))
    return { post }
  }
}
</script>