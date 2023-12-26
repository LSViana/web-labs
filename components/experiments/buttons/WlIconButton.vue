<template>
  <WlButton :variant="variant" class="h-10 w-10 rounded-full">
    <slot />
  </WlButton>
</template>

<script lang="ts" setup>
import WlButton, { type WlButtonVariant } from '~/components/experiments/buttons/WlButton.vue'

type Props = {
  variant: WlButtonVariant;
}

defineProps<Props>()
</script>
