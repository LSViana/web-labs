<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlPomodoro />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { navigateTo } from '#app';
import { definePageMeta } from '#imports';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlPomodoro from '~~/layers/pomodoro/components/WlPomodoro.vue';
import { providePomodoroStorage } from '~~/layers/pomodoro/composables/usePomodoroStorage';
import { useProductivityAuth } from '~~/layers/productivity/composables/useProductivityAuth';

definePageMeta({
  middleware: () => {
    const auth = useProductivityAuth();

    if (!auth.authenticated.value) {
      return navigateTo('/applications/pomodoro/login');
    }
  },
});

providePomodoroStorage();
</script>
