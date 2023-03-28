<template>
  <figure class="image is-16by9">
    <iframe
      :src="src"
      frameborder="0"
      class="has-ratio"
      style="width:100%"
    />
  </figure>
</template>

<script setup>
const props = defineProps({
  src: String
})
</script>
