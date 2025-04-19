<template>
  <div class="flex h-2 w-32 overflow-hidden rounded-full bg-violet-900">
    <span class="inline-block h-full bg-violet-500 transition-[width]" :style="trackStyles" />
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';
import { computed } from 'vue';

type Props = {
  value: number
  max: number
};

const props = defineProps<Props>();

const trackStyles = computed<StyleValue>(() => ({
  width: `${props.value / props.max * 100}%`,
}));
</script>
