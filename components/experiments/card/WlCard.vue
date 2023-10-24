<template>
  <NuxtLink
    class="
      block rounded border p-3
      text-center
      transition-colors hover:border-slate-400
      active:bg-slate-300 dark:active:bg-slate-700 dark:active:text-slate-50
    "
    :to="to"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
type Props = {
  to: string;
};
type Events = {};

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const listeners = {}

const methods = {}
</script>

<style lang="scss" scoped>
</style>
