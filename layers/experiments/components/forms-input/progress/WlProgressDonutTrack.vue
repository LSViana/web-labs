<template>
  <svg width="100" height="100" class="-rotate-90">
    <circle
      cx="50%"
      cy="50%"
      r="50%"
      stroke-width="0.5rem"
      class="fill-transparent stroke-red-900"
    />
    <circle
      r="50%"
      cx="50%"
      cy="50%"
      stroke-width="0.5rem"
      :stroke-dasharray="`calc(3.141592653589793 * ${percentageValue}%) calc(2 * 3.141592653589793 * 50%)`"
      stroke-linecap="round"
      class="fill-transparent stroke-red-500 transition-[stroke-dasharray]"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  value: number
  max: number
};

const props = defineProps<Props>();

const percentageValue = computed(() => props.value / props.max * 100);
</script>
