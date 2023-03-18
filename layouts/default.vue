<template>
  <div class="is-tall">
    <main class="is-tall-container">
      <nuxt />
    </main>
    <div v-if="showChevron" class="is-hidden-mobile is-bottom-right">
      <b-tooltip :label="$t('scrollToTop')" position="is-left">
        <b-icon icon="chevron-up" type="is-black" size="is-medium" @click.native="scrollToTop"></b-icon>
      </b-tooltip>
    </div>
    <layout-footer />
  </div>
</template>

<script>
import layoutFooter from '~/components/layout/footer'
export default {
  components: {
    layoutFooter
  },
  data: () => ({
    showChevron: false
  }),
  mounted() {
    setInterval(() => {
      this.showChevron = (window.pageYOffset > 0) ? true : false
    }, 1000)
  }
}
</script>

<style>
.is-tall {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.is-tall-container {
  flex: 1;
}
</style>
