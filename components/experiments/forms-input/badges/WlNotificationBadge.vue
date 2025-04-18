<template>
  <div
    class="absolute -right-3 -top-3 flex size-6 items-center justify-center rounded-full bg-red-600 text-sm text-white
    transition-transform duration-300 ease-in-out"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  value: boolean
}

const props = defineProps<Props>()

const classes = computed(() => ({
  'scale-0': !props.value,
}))
</script>
