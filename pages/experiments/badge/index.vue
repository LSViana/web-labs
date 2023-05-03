<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The notification badge:</p>
      <ExperimentCanvas>
        <div class="w-12 h-12 aspect-square rounded bg-pink-300 text-pink-800 flex justify-center items-center relative">
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
import WlNotificationBadge from '~/components/experiments/badges/WlNotificationBadge.vue'

const badge = ref(true)
</script>
