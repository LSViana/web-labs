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
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/buttons/WlButton.vue'

import { useCustomViewTransitions } from '~/composables/view-transitions'

useCustomViewTransitions()
</script>
