import { defineNuxtPlugin } from '#app'
import { OButton, Config } from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('OButton', OButton)
  nuxtApp.vueApp.use(Config, bulmaConfig)
})