<template>
  <NuxtLayout name="home">
    <div class="flex justify-center p-3">
      <NuxtLink to="/experiments/navigation/transitions" draggable="false">
        <WlButton variant="primary" style="view-transition-name: view-details">
          View Details
        </WlButton>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'

import { useCustomViewTransitions } from '~/composables/view-transitions'

useCustomViewTransitions()
</script>

<style lang="scss">
@keyframes old {
  to {
    transform: scale(102%);
  }
}

@keyframes new {
  from {
    opacity: 0;
    transform: scale(98%);
  }
}

@keyframes view-details {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

::view-transition-old(view-details) {
  display: none;
}

::view-transition-new(view-details) {
  animation: view-details 300ms ease-in-out;
  mix-blend-mode: normal;
}

html.end {
  &::view-transition-old(root),
  &::view-transition-new(root) {
    mix-blend-mode: unset;
  }

  &::view-transition-old(root) {
    animation: 300ms ease-in-out old;
  }

  &::view-transition-new(root) {
    animation: 300ms ease-in-out new;
  }
}
</style>
