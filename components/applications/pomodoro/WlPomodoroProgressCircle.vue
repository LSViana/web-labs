<template>
  <div class="wl-progress relative flex aspect-square items-center justify-center" :style="progressStyles">
    <svg class="absolute inset-0 overflow-hidden rounded-full" width="100%" height="100%">
      <circle
          class="wl-circle relative fill-none stroke-slate-900"
          cx="50%" cy="50%" r="50%" stroke-width="1rem"
      />
      <circle
          class="wl-circle fill-none stroke-primary-100"
          cx="50%" cy="50%" r="50%" stroke-width="1rem"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
      />
    </svg>
    <p class="relative text-5xl font-bold">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

type Props = {
  text: string;
  progress: number;
}

const size = 180
const radius = size / 2
const circumference = 2 * Math.PI * radius

const props = defineProps<Props>()

const progressStyles = computed<Partial<StyleValue>>(() => ({
  width: `${size}px`
}))
const dashArray = computed(() => {
  const dash = Math.max(0, props.progress) * circumference

  return `${dash} ${circumference - dash}`
})
const dashOffset = computed(() => circumference / 4)
</script>

<style lang="scss" scoped>
.wl-circle {
  --size: 200px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 20px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((attr(data-progress, number) * var(--circumference)) / 100);
  animation: progress-animation 5s linear 0s 1 forwards;
}
</style>
