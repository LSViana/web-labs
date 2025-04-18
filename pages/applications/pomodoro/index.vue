<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlPomodoro />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { definePageMeta } from '#imports'
import { providePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import WlPomodoro from '~/components/applications/pomodoro/WlPomodoro.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import { useProductivityAuth } from '~/composables/productivity/useProductivityAuth'

definePageMeta({
  middleware: () => {
    const auth = useProductivityAuth()

    if (!auth.authenticated.value) {
      return navigateTo('/applications/pomodoro/login')
    }
  },
})

providePomodoroStorage()
</script>
