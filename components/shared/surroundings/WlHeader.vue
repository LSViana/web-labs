<template>
  <header class="border-b">
    <WlContainer class="flex items-center justify-between">
      <h2 class="text-2xl">
        <NuxtLink to="/" class="inline-block p-3">
          Web Labs
        </NuxtLink>
      </h2>
      <NuxtLink v-if="!isHome" to="/" class="inline-block p-3 transition-opacity hover:opacity-70">
        Back to home
      </NuxtLink>
    </WlContainer>
  </header>
</template>

<script setup>
import { useRoute } from '#app'
import { computed } from 'vue'

import WlContainer from '~/components/shared/layout/WlContainer.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
