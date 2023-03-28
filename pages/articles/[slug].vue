<template>
  <NuxtLayout>
    <ContentRenderer :key="key" :value="content">
      <section class="section">
        <h1 class="title is-1 has-text-primary">{{ title }}</h1>
        <div class="subtitle is-5">{{ description }}</div>
      </section>
      <section class="section">
        <div class="block is-italic">
          <!-- {{$t('published')}} {{ $day(content.createdAt).fromNow() }}  -->
          <span v-if="isUpdated">
            <br class="is-hidden-tablet">
            <span class="is-hidden-mobile"> | </span>
            <!-- {{$t('updated')}} {{ $day(content.updatedAt).fromNow() }} -->
          </span>
        </div>
      </section>
      <section v-if="toc.length" class="section">
        <div class="box">
          <div class="title is-5 has-text-primary">{{ $t('toc') }}</div>
          <ul>
            <li v-for="section of toc" :key="section.id">
              <b-button tag="nuxt-link" :to="`#${section.id}`" class="is-text has-text-link is-underline-dotted">
                {{ section.text }}
              </b-button>
            </li>
          </ul>
        </div>
      </section>
      <section class="section">
        <ContentRendererMarkdown :value="content" />
        <ContentSandbox v-if="sandbox" :src="sandbox" />
      </section>
    </ContentRenderer>
    <DevOnly>
      <pre>{{ JSON.stringify({ content }, null, 2) }}</pre>
    </DevOnly>
  </NuxtLayout>
</template>

<script setup>
const { $contentGetOne } = useNuxtApp()
const { key, title, description, tags, sandbox, content, toc } = await $contentGetOne('articles')
</script>