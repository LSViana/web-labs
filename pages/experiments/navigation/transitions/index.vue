<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The View Transitions API example:</p>
      <ExperimentCanvas>
        <NuxtLink to="/experiments/transitions/end" draggable="false">
          <WlButton variant="primary" style="view-transition-name: view-details">
            View Details
          </WlButton>
        </NuxtLink>
      </ExperimentCanvas>
      <p>Animating an element to wherever the user clicks using Web Animations API:</p>
      <ExperimentCanvas>
        <WlMovableElementWebAnimationsApi />
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlMovableElementWebAnimationsApi from '~/components/experiments/transitions/WlMovableElementWebAnimationsApi.vue'

import { useCustomViewTransitions } from '~/composables/view-transitions'

useCustomViewTransitions()
</script>
