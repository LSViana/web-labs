<template>
  <div class="overflow-hidden rounded border">
    <div class="wl-canvas p-5">
      <slot />
    </div>
    <div v-if="hasCaption" class="border-t bg-slate-50 p-3 text-sm text-muted dark:bg-slate-700 dark:text-muted-dark">
      <slot name="caption" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'

const slots = useSlots()
const hasCaption = computed(() => Boolean(slots.caption))
</script>

<style lang="scss" scoped>
@import 'tailwindcss/utilities.css';

.wl-canvas {
  @apply bg-white;
  @apply dark:bg-slate-900;
  @apply bg-[length:8px_8px];
  @apply bg-[position:3px_3px];
  @apply bg-[radial-gradient(#{theme('colors.slate.300')}_1px,transparent_0)];
  @apply dark:bg-[radial-gradient(#{theme('colors.slate.700')}_1px,transparent_0)];
}
</style>

