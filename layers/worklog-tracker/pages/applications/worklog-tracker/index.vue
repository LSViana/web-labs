<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlWorklogTracker />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { navigateTo } from '#app';
import { definePageMeta } from '#imports';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import { useProductivityAuth } from '~~/layers/productivity/composables/useProductivityAuth';
import WlWorklogTracker from '~~/layers/worklog-tracker/components/WlWorklogTracker.vue';
import { provideWorklogStorage } from '~~/layers/worklog-tracker/composables/useWorklogStorage';

definePageMeta({
  middleware: () => {
    const auth = useProductivityAuth();

    if (!auth.authenticated.value) {
      return navigateTo('/applications/worklog-tracker/login');
    }
  },
});

provideWorklogStorage();
</script>
