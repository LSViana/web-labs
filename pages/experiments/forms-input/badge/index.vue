<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The notification badge:</p>
      <WlExperimentCanvas>
        <div class="relative flex aspect-square size-12 items-center justify-center rounded bg-pink-300 text-pink-800">
          <WlNotificationBadge v-model:value="badge">1</WlNotificationBadge>
          <span>BR</span>
        </div>
        <template #caption>
          Used to inform the user, in a glance, about notifications.
          <a href="#" class="underline" @click="badge = !badge">Toggle badge visibility</a>.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import WlNotificationBadge from '~/components/experiments/forms-input/badges/WlNotificationBadge.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

const badge = ref(true)
</script>
