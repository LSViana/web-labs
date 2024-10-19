<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <WlWorklogTracker/>
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { provideWorklogStorageDemo } from '~/components/applications/worklog-tracker/useWorklogStorageDemo'
import WlWorklogTracker from '~/components/applications/worklog-tracker/WlWorklogTracker.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

provideWorklogStorageDemo()
</script>
