<template>
  <button
    class="btn-button px-4 py-2 rounded transition-[background-color,box-shadow] focus:ring-4"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary';

const props = defineProps<{
  variant: ButtonVariant;
}>()

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-primary-100 ring-primary-300 hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-gray-500 text-gray-100 ring-gray-300 hover:bg-gray-600 active:bg-gray-700'
}

const classes = computed(() => ([
  variantClasses[props.variant]
]))
</script>
