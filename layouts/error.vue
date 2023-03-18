<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p v-if="error.statusCode === 404" class="title">{{$t('pageNotFound')}}</p>
        <p v-else-if="error.statusCode === 401" class="title">{{$t('unauthorized')}}</p>
        <p v-else class="title">{{$t('somethingWentWrong')}}</p>
        <p class="subtitle">
          <nuxt-link :to="localePath({ name: 'index' })">{{$t('backToTheHomePage')}}</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    props: ['error']
  }
</script>
