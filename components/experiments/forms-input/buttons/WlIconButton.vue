<template>
  <WlButton :variant="variant" class="h-10 w-10 rounded-full">
    <slot />
  </WlButton>
</template>

<script lang="ts" setup>
import WlButton from 'components/experiments/forms-input/buttons/WlButton.vue'

import type { WlButtonVariant } from '~/components/experiments/forms-input/buttons/WlButton.vue'

type Props = {
  variant: WlButtonVariant;
}

defineProps<Props>()
</script>
