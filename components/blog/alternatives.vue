<template>
  <section class="section content">
    <i18n path="alt" tag="div">
      <template v-slot:lang>
        <p v-for="alternative of alternatives" :key="alternative.path">
          <nuxt-link :to="alternative.path">{{ language(alternative.path) }}</nuxt-link>
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
      return path.split('/')[1]
    },
    language(path) {
      const code = this.code(path)
      return find(locales, { code }).name
    }
  }
}
</script>