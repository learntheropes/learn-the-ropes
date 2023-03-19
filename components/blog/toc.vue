<template>
  <div v-if="toc.length" class="section">
    <div class="box">
      <div class="title is-5 has-text-primary">{{ $t('toc') }}</div>
      <ul>
        <li v-for="section of toc" :key="section.id">
          <b-button tag="nuxt-link" :to="`#${section.id}`" class="is-text has-text-link is-underline-dotted">
            {{ section.text }}
          </b-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'toc'
  ]
}
</script>