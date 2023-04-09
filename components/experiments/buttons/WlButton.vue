<template>
  <button
    class="wl-button px-4 py-2 rounded transition-[background-color,box-shadow] focus:ring-4"
    :class="classes"
    v-on="listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export type WlButtonVariant = 'primary' | 'secondary' | 'danger'

type Props = {
  variant: WlButtonVariant;
}
type Events = {
  (e: 'click', event: MouseEvent): void;
  (e: 'mousedown', event: MouseEvent): void;
  (e: 'mouseup', event: MouseEvent): void;
  (e: 'mouseenter', event: MouseEvent): void;
  (e: 'mouseleave', event: MouseEvent): void;
}

const variantClasses: Record<WlButtonVariant, string> = {
  primary: 'bg-primary-500 text-primary-50 ring-primary-300 hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-gray-500 text-gray-50 ring-gray-300 hover:bg-gray-600 active:bg-gray-700',
  danger: 'bg-red-500 text-red-50 ring-red-300 hover:bg-red-600 active:bg-red-700'
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const classes = computed(() => ([
  variantClasses[props.variant]
]))

const listeners = {
  click (event: MouseEvent): void {
    emits('click', event)
  },
  mousedown (event: MouseEvent): void {
    emits('mousedown', event)
  },
  mouseup (event: MouseEvent): void {
    emits('mouseup', event)
  },
  mouseenter (event: MouseEvent): void {
    emits('mouseenter', event)
  },
  mouseleave (event: MouseEvent): void {
    emits('mouseleave', event)
  }
}
</script>
