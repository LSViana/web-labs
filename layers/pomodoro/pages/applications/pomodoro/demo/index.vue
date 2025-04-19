<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlPomodoro />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlPomodoro from '~~/layers/pomodoro/components/WlPomodoro.vue';
import { providePomodoroStorageDemo } from '~~/layers/pomodoro/composables/usePomodoroStorageDemo';

providePomodoroStorageDemo();
</script>
