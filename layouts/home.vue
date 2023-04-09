<template>
  <div id="home" class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

import Header from '~/components/shared/surroundings/Header.vue'
import Footer from '~/components/shared/surroundings/Footer.vue'

useHead({
  title: 'Web Labs',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, user-scalable=no'
    }
  ],
  link: [
    {
      rel: 'icon',
      href: '/img/test-tube.png'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'
    }
  ]
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/layouts/home';
</style>
