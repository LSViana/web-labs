<template>
  <div class="relative flex h-64 w-64 flex-col overflow-hidden rounded-3xl bg-gray-800 p-6">
    <h2 class="font text-5xl font-bold" :class="classes.text">
      {{ value }}%
    </h2>
    <p class="text-gray-400">
      {{ charging ? 'Charging...' : 'Charged' }}
    </p>
    <div class="grow" />
    <p v-if="charging && value < 100" class="leading-5">
      <span class="text-gray-200">{{ remainingTime }}</span>
      <br>
      <span class="text-gray-400">Until full charge</span>
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
          <!-- d="M0 557L67.2437 583.696C109.788 600.586 157.188 600.525 199.688 583.525V583.525C242.262 566.495 289.921 566.532 332.517 583.507V583.507C375.108 600.479 423.193 600.431 465.828 583.568V583.568C508.688 566.616 556.85 566.468 599.688 583.475V583.475C642.6 600.512 690.4 600.512 733.312 583.475L800 557V1230H0V557Z" -->
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

const remainingMinutes = computed(() => (100 - props.value) * 180 / 100)
const remainingTime = computed(() => {
  const hours = Math.floor(remainingMinutes.value / 60)
  const minutes = Math.round(remainingMinutes.value % 60)

  if (minutes === 0) {
    return `${hours}h`
  }

  if (hours === 0) {
    return `${minutes}m`
  }

  return `${hours}h ${minutes}m`
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
