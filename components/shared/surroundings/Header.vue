<template>
  <header class="border-b">
    <Container class="flex items-center justify-between">
      <h2 class="text-2xl">
        <NuxtLink to="/" class="inline-block p-3">
          Web Labs
        </NuxtLink>
      </h2>
      <NuxtLink v-if="!isHome" to="/" class="inline-block p-3">
        Back to home
      </NuxtLink>
    </Container>
  </header>
</template>

<script setup>
import { useRoute } from '#app'
import { computed } from 'vue'

import Container from '~/components/shared/layout/Container.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
