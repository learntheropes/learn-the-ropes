<template>
  <section class="section">
    <figure class="image is-16by9">
      <iframe
        :src="src"
        frameborder="0"
        class="has-ratio"
        style="width:100%;"
      />
    </figure>
  </section>
</template>

<script>
export default {
  props: [
    'src'
  ]
}
</script>