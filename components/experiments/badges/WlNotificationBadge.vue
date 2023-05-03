<template>
  <div
    class="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-600 text-white flex justify-center items-center
    text-sm transition-transform transform ease-in-out duration-300"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  value: boolean;
};

const props = defineProps<Props>()

const classes = computed(() => ({
  'scale-0': !props.value
}))
</script>
