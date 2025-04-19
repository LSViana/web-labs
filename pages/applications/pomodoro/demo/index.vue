<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlPomodoro />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { providePomodoroStorageDemo } from '~/components/applications/pomodoro/usePomodoroStorageDemo'
import WlPomodoro from '~/components/applications/pomodoro/WlPomodoro.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

providePomodoroStorageDemo()
</script>
