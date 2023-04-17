<template>
  <span class="wl-icon inline-flex justify-center fill-current" :class="classes">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export type WlIconSize = 'md';

type Props = {
  size?: WlIconSize;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses: Record<WlIconSize, string> = {
  md: 'w-4 h-4'
}

const classes = computed(() => [
  sizeClasses[props.size]
])
</script>
