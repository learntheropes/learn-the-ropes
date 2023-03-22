<template>
  <section class="section content">
    <i18n path="alt" tag="div">
      <template v-slot:lang>
        <p v-for="alternative of alternatives" :key="alternative.path">
          <nuxt-link :to="link(alternative.path)">{{ language(alternative.path) }}</nuxt-link>
        </p>   
      </template>
    </i18n> 
  </section>
</template>

<script>
import { locales } from '~/assets/js/locales'
import find from 'lodash.find'
export default {
  props: [
    'alternatives'
  ],
  methods: {
    code(path) {
      return path.split('/')[2]
    },
    slug(path) {
      return path.split('/')[3]
    },
    language(path) {
      const code = this.code(path)
      return find(locales, { code }).name
    },
    link(path) {
      const code = this.code(path)
      const slug = this.slug(path)
      return `/${code}/posts/${slug}`
    }
  }
}
</script>