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
      <p>The same-page View Transitions API example:</p>
      <WlExperimentCanvas>
        <div
            class="size-12 rounded"
            :class="classes.container"
            style="view-transition-name: container"
            @click="listeners.containerClick"
        />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import { useCustomViewTransitions } from '~/composables/view-transitions'

useCustomViewTransitions()

const containerTransition = ref(false)

const classes = computed(() => ({
  container: containerTransition.value ? 'translate-x-12 rotate-90 bg-danger-600' : 'bg-primary-600'
}))

const listeners = {
  containerClick () {
    document.startViewTransition(() => {
      containerTransition.value = !containerTransition.value
    })
  }
}
</script>
