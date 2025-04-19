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
          style="view-transition-name: container-1"
          @click="listeners.container1Click"
        />
      </WlExperimentCanvas>
      <p>Toggle element visibility with View Transitions API:</p>
      <WlExperimentCanvas>
        <div
          class="size-12 rounded bg-green-600"
          :class="{ 'invisible -translate-y-2': !container2Visible }"
          style="view-transition-name: container-2"
          @click="listeners.container2Click"
        />
        <template #caption>
          The element will fade in and out with a transition.
          <a href="#" class="underline" @click="listeners.container2Click">Toggle visibility</a>.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import { useCustomViewTransitions } from '~~/layers/experiments/composables/view-transitions';

useCustomViewTransitions();

const container1Transition = ref(false);
const container2Visible = ref(true);

const classes = computed(() => ({
  container: container1Transition.value ? 'translate-x-12 rotate-90 bg-danger-600' : 'bg-primary-600',
}));

const listeners = {
  container1Click() {
    document.startViewTransition(() => {
      container1Transition.value = !container1Transition.value;
    });
  },
  container2Click() {
    document.startViewTransition(() => {
      container2Visible.value = !container2Visible.value;
    });
  },
};
</script>
