<template>
  <label class="text-muted dark:text-muted-dark" :for="props.for">
    <slot />
  </label>
</template>

<script setup lang="ts">
type Props = {
  for?: string
}

const props = defineProps<Props>()
</script>
