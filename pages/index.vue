<template>
  <NuxtLayout>
    <div class="container">
      <p>{{ t('title') }}</p>
      <p>{{ t('description') }}</p>
      <!-- <index-tags /> -->
      <!-- <index-posts /> -->
      <o-button @click="logPublicKey" outlined variant="primary">Primary</o-button>
    </div>
  </NuxtLayout>
</template>

<script setup>
  const { t } = useI18n()
  definePageMeta({
    title: 'title',
    description: 'description'
  })
</script>

<script>
import { getPublicKey } from 'nostr-tools'
export default {
  methods: {
    logPublicKey() {
      const publicKey = getPublicKey('4feef81b073943617026bd568f309051a26b11e1bee7af914980287426c68b4c')
      console.log(publicKey)
    }
  }
}
</script>