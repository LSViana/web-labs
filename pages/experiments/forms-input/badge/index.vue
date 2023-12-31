<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The notification badge:</p>
      <ExperimentCanvas>
        <div class="relative flex aspect-square h-12 w-12 items-center justify-center rounded bg-pink-300 text-pink-800">
          <WlNotificationBadge v-model:value="badge">1</WlNotificationBadge>
          <span>BR</span>
        </div>
        <template #caption>
          Used to inform the user, in a glance, about notifications.
          <a href="#" class="underline" @click="badge = !badge">Toggle badge visibility</a>.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlNotificationBadge from '~/components/experiments/forms-input/badges/WlNotificationBadge.vue'

const badge = ref(true)
</script>
