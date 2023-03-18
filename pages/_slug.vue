<template>
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-1">
          {{ post.title }}
        </h1>
        <div class="subtitle is-5">
          {{ post.description }}
        </div>
        <div class="block is-italic">
          {{$t('published')}} {{ $moment(post.createdAt).fromNow() }} 
          <br class="is-hidden-tablet">
          <span class="is-hidden-mobile"> | </span>
          {{$t('updated')}} {{ $moment(post.updatedAt).fromNow() }}
        </div>
      </section>
      <section class="section">
        <blog-toc :toc="post.toc" />
      </section>
      <section class="section">
        <div class="content">
          <nuxt-content :document="post" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BlogToc from '~/components/blog/toc.vue'
export default {
  components: {
    BlogToc
  },
  async asyncData({ $content, params: { slug }, app, error }) {

    const post = await $content(app.i18n.locale, slug, { text: true })
      .fetch()
      .catch(() => {
        error({ statusCode: 404 })
      })

    return { post }
  }
}
</script>

<style lang="scss">
.nuxt-content {
  h2 {
    a{ 
      span {
        display: none;
      }
    }
  }
  h3 {
    a{ 
      span {
        display: none;
      }
    }
  }
}
</style>
