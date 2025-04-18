<template>
  <svg
    :width="dimensions.width"
    :height="dimensions.height"
    :viewBox="`0 0 ${dimensions.width} ${dimensions.height}`"
    fill="none"
  >
    <path
      d="M316 0V10C316 12.2091 314.209 14 312 14H5C2.79086 14 1 15.7909 1 18V80"
      stroke="white"
      stroke-opacity="0.2"
    />
    <path
      d="M316 0V10C316 12.2091 314.209 14 312 14H5C2.79086 14 1 15.7909 1 18V80"
      stroke="url(#pulse)"
      stroke-width="2"
    />
    <defs>
      <linearGradient
        id="pulse"
        gradientUnits="userSpaceOnUse"
        :x1="computedDimensions.width * 2"
        :x2="computedDimensions.width"
        :y1="dimensions.height + computedDimensions.height"
        :y2="dimensions.height * 2 - computedDimensions.height"
      >
        <stop stop-color="#FF0000" stop-opacity="0" />
        <stop stop-color="#FF0000" />
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
  <div class="mt-3">
    <input
v-model.number="progress"
type="range"
min="0"
max="100">
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const dimensions = {
  height: 80,
  width: 317
}

const progress = ref(0)

const computedDimensions = computed(() => ({
  height: progress.value / 100 * dimensions.height,
  width: progress.value / 100 * dimensions.width
}))
</script>
