<template>
  <NuxtLayout name="home">
    <WlContainer class="p-3">
      <WlPomodoroAuthForm />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { definePageMeta, navigateTo, useProductivityAuth } from '#imports';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlPomodoroAuthForm from '~~/layers/pomodoro/components/WlPomodoroAuthForm.vue';

definePageMeta({
  middleware: () => {
    const auth = useProductivityAuth();

    if (auth.authenticated.value) {
      return navigateTo('/applications/pomodoro');
    }
  },
});
</script>
