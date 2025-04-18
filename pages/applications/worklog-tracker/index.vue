<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlWorklogTracker />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { definePageMeta } from '#imports'
import { provideWorklogStorage } from '~/components/applications/worklog-tracker/useWorklogStorage'
import WlWorklogTracker from '~/components/applications/worklog-tracker/WlWorklogTracker.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import { useProductivityAuth } from '~/composables/productivity/useProductivityAuth'

definePageMeta({
  middleware: () => {
    const auth = useProductivityAuth()

    if (!auth.authenticated.value) {
      return navigateTo('/applications/worklog-tracker/login')
    }
  },
})

provideWorklogStorage()
</script>
