<template>
  <div class="relative flex h-64 w-64 flex-col overflow-hidden rounded-3xl bg-gray-800 p-6">
    <h2 class="text-5xl font-bold" :class="classes.text">
      {{ value }}%
    </h2>
    <p class="text-gray-400">
      {{ charging ? 'Charging...' : 'Charged' }}
    </p>
    <div class="absolute -bottom-16 -right-36">
      <svg
        class="h-96 w-96 fill-gray-700"
        width="661"
        height="1230"
        viewBox="0 0 661 1230"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M661 537H361L557.5 0L42.7688 644.914C25.5185 666.528 40.9076 698.5 68.5609 698.5H297.5L102 1230L661 537Z" />
        <mask id="bolt">
          <path d="M661 537H361L557.5 0L42.7688 644.914C25.5185 666.528 40.9076 698.5 68.5609 698.5H297.5L102 1230L661 537Z" class="fill-white" />
        </mask>
        <g mask="url(#bolt)">
          <path
            :d="batteryPath"
            class="origin-center transition-transform"
            :class="classes.illustration"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  value: number;
  charging: boolean;
};

const props = defineProps<Props>()

const classes = computed(() => {
  if (props.charging) {
    return {
      text: 'text-emerald-400',
      illustration: 'fill-emerald-400 animate-pulse'
    }
  } else if (props.value < 10) {
    return {
      text: 'text-red-400',
      illustration: 'fill-red-400'
    }
  } else if (props.value < 20) {
    return {
      text: 'text-yellow-400',
      illustration: 'fill-yellow-400'
    }
  } else {
    return {
      text: 'text-blue-400',
      illustration: 'fill-blue-400'
    }
  }
})

const batteryPath = computed(() => {
  // The `batteryValue` represents a transformation of `props.value` from the range
  // [0, 100] to the range [16, 84] so that it renders progress inside the box.
  const batteryValue = 16.5 + (props.value * 0.67)

  // The `top` variable means where the top line will be drawn.
  const top = (100 - batteryValue) * 1230 / 100

  return `M0 1230 L661 1230 L661 ${top} L0 ${top} L0 0 Z`
})
</script>
