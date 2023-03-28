export default defineNuxtPlugin(({ $contentDestructured }) => {
  return {
    provide: {
      contentGetOne: async (folder) => {
        const {
          params: { slug },
        } = useRoute()
        const {
          locale: { value: locale },
        } = useI18n()
        const {
          data: { _value },
        } = await useAsyncData(`/${folder}/${slug}`, () =>
          queryContent()
            .where({
              _path: `/${folder}/${slug}`,
              _locale: locale,
            })
            .findOne()
            .catch(error => {
              console.log('error', error)
              return showError({
                statusCode: error.statusCode,
                statusMessage: error.statusMessage
              })
            })
        )
        return _value
      },
    },
  }
})
