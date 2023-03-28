export default defineNuxtPlugin(() => {
  return {
    provide: {
      contentDestructured: (data) => {
        const { _id: key, title, description, tags, sandbox, body } = data
        console.log('body', body)
        const { toc } = body
        return {
          key,
          title,
          description,
          tags,
          sandbox,
          content: data,
          toc,
        }
      },
    },
  }
})