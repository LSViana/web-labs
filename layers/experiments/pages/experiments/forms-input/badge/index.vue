<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The notification badge:</p>
      <WlExperimentCanvas>
        <div class="relative flex aspect-square size-12 items-center justify-center rounded bg-pink-300 text-pink-800">
          <WlNotificationBadge v-model:value="badge">
            1
          </WlNotificationBadge>
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
import { ref } from 'vue';

import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlNotificationBadge from '~~/layers/experiments/components/forms-input/badge/WlNotificationBadge.vue';

const badge = ref(true);
</script>
