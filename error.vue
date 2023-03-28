<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p v-if="error.statusCode === 404" class="title">
          {{ $t('pageNotFound') }}
        </p>
        <p v-else-if="error.statusCode === 401" class="title">
          {{ $t('unauthorized') }}
        </p>
        <p v-else class="title">
          {{$t('somethingWentWrong')}}
        </p>
        <o-button
          tag="router-link"
          :to="localePath({ name: 'index' })"
          class="subtitle"
        >
          {{ $t('backToTheHomePage') }}
        </o-button>
        <section class="section">
          <div class="content">
            {{ error.message }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})
</script>