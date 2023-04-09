<template>
  <div class="border rounded overflow-hidden">
    <div class="canvas p-5">
      <slot />
    </div>
    <div v-if="hasCaption" class="border-t p-3 text-sm text-muted">
      <slot name="caption" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const slots = useSlots()
const hasCaption = computed(() => Boolean(slots.caption))
</script>

<style lang="scss" scoped>
@import 'tailwindcss/utilities.css';

.canvas {
  @apply bg-gray-50;
  @apply bg-[length:8px_8px];
  @apply bg-[position:8px_8px];
  @apply bg-[radial-gradient(#{theme('colors.gray.300')}_1px,transparent_0)];
}
</style>
