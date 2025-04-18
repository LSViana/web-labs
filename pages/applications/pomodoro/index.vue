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
import { usePomodoroAuth } from '~/components/applications/pomodoro/usePomodoroAuth'
import { providePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import WlPomodoro from '~/components/applications/pomodoro/WlPomodoro.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

definePageMeta({
  middleware: () => {
    const auth = usePomodoroAuth()

    if (!auth.authenticated.value) {
      return navigateTo('/applications/pomodoro/login')
    }
  },
})

providePomodoroStorage()
</script>
