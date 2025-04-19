<template>
  <div class="flex items-center gap-3">
    <p>Counter: <code>{{ counter }}</code></p>
    <WlIconButton variant="secondary" class="size-6" @click="counter++">
      +
    </WlIconButton>
    <WlIconButton variant="secondary" class="size-6" @click="counter--">
      -
    </WlIconButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import WlIconButton from '~/components/experiments/forms-input/buttons/WlIconButton.vue'

const counter = ref(0)

// The following can't be done because it causes hydration errors.
// const counter = ref(Math.round(Math.random() * 100))
</script>
