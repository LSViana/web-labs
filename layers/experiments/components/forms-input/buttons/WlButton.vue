<template>
  <button
    class="flex items-center justify-center rounded
      px-4 py-2 outline-0 transition-[background-color,box-shadow] focus-visible:z-10
      focus-visible:ring-4"
    :disabled="props.disabled"
    :class="classes"
    v-on="listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

export type WlButtonVariant = 'primary' | 'secondary' | 'warning' | 'danger' | 'transparent';

type Props = {
  variant: WlButtonVariant
  disabled?: boolean
};
type Events = {
  (e: 'click', event: MouseEvent): void
  (e: 'mousedown', event: MouseEvent): void
  (e: 'mouseup', event: MouseEvent): void
  (e: 'mouseenter', event: MouseEvent): void
  (e: 'mouseleave', event: MouseEvent): void
  (e: 'touchstart', event: TouchEvent): void
  (e: 'touchend', event: TouchEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
};

const variantClasses: Record<WlButtonVariant, string> = {
  primary: 'bg-primary-600 text-primary-50 '
    + 'hover:bg-primary-700 active:bg-primary-800 '
    + 'focus:ring-primary-300',
  secondary: 'bg-gray-500 text-gray-50 '
    + 'hover:bg-gray-600 active:bg-gray-700 '
    + 'focus:ring-gray-300',
  danger: 'bg-red-600 text-red-50 '
    + 'hover:bg-red-700 active:bg-red-800 '
    + 'focus:ring-red-300',
  warning: 'bg-yellow-600 text-yellow-50 '
    + 'hover:bg-yellow-700 active:bg-yellow-700 '
    + 'focus:ring-yellow-500',
  transparent: '', // Used when it's necessary to manually set the colors.
};

const disabledVariantClasses: Record<WlButtonVariant, string> = {
  primary: 'bg-primary-700 text-primary-100',
  secondary: 'bg-secondary-700 text-secondary-100',
  danger: 'bg-danger-700 text-danger-100',
  warning: 'bg-warning-700 text-warning-100',
  transparent: '', // Used when it's necessary to manually set the colors.
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
const emits = defineEmits<Events>();

const classes = computed(() => props.disabled
  ? disabledVariantClasses[props.variant]
  : variantClasses[props.variant],
);

const listeners = {
  click(event: MouseEvent): void {
    emits('click', event);
  },
  mousedown(event: MouseEvent): void {
    emits('mousedown', event);
  },
  mouseup(event: MouseEvent): void {
    emits('mouseup', event);
  },
  mouseenter(event: MouseEvent): void {
    emits('mouseenter', event);
  },
  mouseleave(event: MouseEvent): void {
    emits('mouseleave', event);
  },
  touchstart(event: TouchEvent): void {
    emits('touchstart', event);
  },
  touchend(event: TouchEvent): void {
    emits('touchend', event);
  },
  keydown(event: KeyboardEvent): void {
    emits('keydown', event);
  },
  keyup(event: KeyboardEvent): void {
    emits('keyup', event);
  },
};
</script>
