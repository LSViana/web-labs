<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The View Transitions API example:</p>
      <WlExperimentCanvas>
        <NuxtLink to="/experiments/navigation/transitions/end" draggable="false">
          <WlButton variant="primary" style="view-transition-name: view-details">
            View Details
          </WlButton>
        </NuxtLink>
      </WlExperimentCanvas>
      <p>Animating an element to wherever the user clicks using Web Animations API:</p>
      <WlExperimentCanvas>
        <WlMovableElementWebAnimationsApi />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlMovableElementWebAnimationsApi from '~/components/experiments/transitions/WlMovableElementWebAnimationsApi.vue'

import { useCustomViewTransitions } from '~/composables/view-transitions'

useCustomViewTransitions()
</script>
