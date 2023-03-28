<template>
  <NuxtLayout>
    <ContentRenderer :key="folio._id" :value="folio" />
    <!-- <DevOnly>
      <pre>{{ JSON.stringify({ folio }, null, 2) }}</pre>
    </DevOnly> -->
  </NuxtLayout>
</template>

<script setup>
  // const { page: folio } = useContent()
  // console.log(folio)
  const { params: { slug }} = useRoute()
const { locale: { value: locale }} = useI18n()
const {
  data: { value: folio }
} = await useAsyncData(`/folios/${slug}`, () => queryContent().where({
  _path: `/folios/${slug}`, _locale: locale
  }).findOne())
</script>