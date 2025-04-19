<template>
  <NuxtLink
    class="block rounded border p-3 text-center"
    :class="classes"
    :to="to"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  to?: string
}

const props = defineProps<Props>()

const linkClasses = 'transition-colors hover:border-slate-400 '
  + 'active:bg-slate-300 dark:active:bg-slate-700 dark:active:text-slate-50'

const classes = computed(() => ({
  [linkClasses]: Boolean(props.to),
}))
</script>
