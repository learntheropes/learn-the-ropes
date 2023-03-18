<template>
  <div class="columns">
      <div class="column">
      <div class="box">
        <div class="title is-5">{{ $t('toc') }}</div>
        <ul>
          <li v-for="section of toc" :key="section.id">
            <b-button tag="a" :href="`#${section.id}`" class="is-text">{{ section.text }}</b-button>
          </li>
        </ul>
      </div>
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
