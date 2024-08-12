<template>
  <button
      class="flex items-center justify-center rounded
      px-4 py-2 outline-0 transition-[background-color,box-shadow] focus-visible:z-10
      focus-visible:ring-4"
      :class="classes"
      v-on="listeners"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export type WlButtonVariant = 'primary' | 'secondary' | 'danger' | 'transparent'

type Props = {
  variant: WlButtonVariant;
}
type Events = {
  (e: 'click', event: MouseEvent): void;
  (e: 'mousedown', event: MouseEvent): void;
  (e: 'mouseup', event: MouseEvent): void;
  (e: 'mouseenter', event: MouseEvent): void;
  (e: 'mouseleave', event: MouseEvent): void;
  (e: 'touchstart', event: TouchEvent): void;
  (e: 'touchend', event: TouchEvent): void;
  (e: 'keydown', event: KeyboardEvent): void;
  (e: 'keyup', event: KeyboardEvent): void;
}

const variantClasses: Record<WlButtonVariant, string> = {
  primary: 'bg-primary-500 text-primary-50 ' +
      'hover:bg-primary-600 active:bg-primary-700 ' +
      'focus:ring-primary-300',
  secondary: 'bg-gray-500 text-gray-50 ' +
      'hover:bg-gray-600 active:bg-gray-700 ' +
      'focus:ring-gray-300',
  danger: 'bg-red-500 text-red-50 ' +
      'hover:bg-red-600 active:bg-red-700 ' +
      'focus:ring-red-300',
  transparent: '' // Used when it's necessary to manually set the colors.
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const classes = computed(() => ([
  variantClasses[props.variant]
]))

const listeners = {
  click(event: MouseEvent): void {
    emits('click', event)
  },
  mousedown(event: MouseEvent): void {
    emits('mousedown', event)
  },
  mouseup(event: MouseEvent): void {
    emits('mouseup', event)
  },
  mouseenter(event: MouseEvent): void {
    emits('mouseenter', event)
  },
  mouseleave(event: MouseEvent): void {
    emits('mouseleave', event)
  },
  touchstart(event: TouchEvent): void {
    emits('touchstart', event)
  },
  touchend(event: TouchEvent): void {
    emits('touchend', event)
  },
  keydown(event: KeyboardEvent): void {
    emits('keydown', event)
  },
  keyup(event: KeyboardEvent): void {
    emits('keyup', event)
  }
}
</script>
