<template>
  <div class="box">
    <div class="title is-5">{{ $t('toc') }}</div>
    <ul>
      <li v-for="section of toc" :key="section.id">
        <b-button tag="nuxt-link" :to="`#${section.id}`" class="is-text is-underline-dotted">
          {{ section.text }}
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'toc'
  ]
}
</script>

<style scoped>
.is-underline-dotted {
  font-weight: bold;
  text-decoration: underline dotted;
}
</style>
