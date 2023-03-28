<template>
  <footer class="footer">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="buttons">
            <o-button
              tag="router-link"
              :to="localePath({ name: 'index' })"
              class="is-text has-text-primary is-underline-dotted"
            >
            {{ t('home') }}
            </o-button>
            <o-button
              v-for="folio in folios"
              :key="folio._path"
              tag="router-link"
              :to="localePath({ path: folio._path })"
              class="is-text has-text-primary is-underline-dotted"
            >
              {{ folio.title }}
            </o-button>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons">
            <o-button
              v-for="locale in availableLocales"
              :key="locale.code"
              tag="router-link"
              :to="switchLocalePath(locale.code)"
              class="is-text has-text-primary is-underline-dotted"
            >
              {{ locale.name }}
            </o-button>
          </div>
        </div>
      </div>
    </nav>
  </footer>
</template>

<script setup>
const { locale, locales, t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { data: { value: folios} } = await useAsyncData('folios', () => queryContent(`/folios`).find())
const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>

