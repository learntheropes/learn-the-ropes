export default defineNuxtPlugin(() => {
  return {
    provide: {
      getContentBySlugAndLocale: async (folder) => {
        try {
          const { params: { slug }} = useRoute()
          const { locale: { value: locale }} = useI18n()
          const { data: content } = await useAsyncData(`/${folder}/${slug}`, () => queryContent().where({
            _path: `/${folder}/${slug}`,
            _locale: locale
            })
            .findOne()
            .catch(error => {
              console.log('error', error)
              return showError({
                statusCode: error.statusCode,
                statusMessage: error.statusMessage
              })
            }))
            console.log('content', content)
          const { _id, title, description, tags, sandbox } = content
          return { _id, title, description, tags, sandbox, content }
                  
        } catch (error) {
          console.log('error', error)
          return showError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage
          })
        }
      }
    }
  }

  // nuxtApp.provide('mediumZoom', zoom)
})