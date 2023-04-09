<template>
  <button
    class="btn-button px-4 py-2 rounded transition-all focus:ring-4"
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
  primary: 'bg-blue-500 text-blue-100 ring-blue-300 hover:bg-blue-600 active:bg-blue-700',
  secondary: 'bg-gray-500 text-gray-100 ring-gray-300 hover:bg-gray-600 active:bg-gray-700'
}

const classes = computed(() => ([
  '',
  variantClasses[props.variant]
]))
</script>

<style lang="scss" scoped>
.btn-button {

}
</style>
