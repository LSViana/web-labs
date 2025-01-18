<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The View Transitions API example:</p>
      <WlExperimentCanvas>
        <NuxtLink to="/experiments/transitions/view-transitions/end" draggable="false">
          <WlButton variant="primary" style="view-transition-name: view-details">
            View Details
          </WlButton>
        </NuxtLink>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import { useCustomViewTransitions } from '~/composables/view-transitions'

useCustomViewTransitions()
</script>
