<template>
  <WlButton :variant="variant" class="size-10 rounded-full">
    <slot />
  </WlButton>
</template>

<script lang="ts" setup>
import WlButton, { type WlButtonVariant } from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';

type Props = {
  variant: WlButtonVariant
};

defineProps<Props>();
</script>
