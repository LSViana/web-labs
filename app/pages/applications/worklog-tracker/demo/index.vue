<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlWorklogTracker />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlWorklogTracker from '~~/layers/worklog-tracker/components/WlWorklogTracker.vue';
import { provideWorklogStorageDemo } from '~~/layers/worklog-tracker/composables/useWorklogStorageDemo';

provideWorklogStorageDemo();
</script>
