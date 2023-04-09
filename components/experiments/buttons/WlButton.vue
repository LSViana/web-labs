<template>
  <button
    class="wl-button px-4 py-2 rounded transition-[background-color,box-shadow] focus:ring-4"
    :class="classes"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary'
type Props = {
  variant: ButtonVariant;
}
type Events = {
  (e: 'click', event: MouseEvent): void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-primary-50 ring-primary-300 hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-gray-500 text-gray-100 ring-gray-300 hover:bg-gray-600 active:bg-gray-700'
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()
const classes = computed(() => ([
  variantClasses[props.variant]
]))

function onClick (event: MouseEvent) {
  emits('click', event)
}
</script>
