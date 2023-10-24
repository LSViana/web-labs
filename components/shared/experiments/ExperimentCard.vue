<template>
  <NuxtLink
    class="
      block rounded border p-3
      text-center
      transition-colors hover:border-slate-400
      active:bg-slate-300 dark:active:bg-slate-700 dark:active:text-slate-50
    "
    :to="props.experiment.route"
  >
    {{ props.experiment.name }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Experiment } from '~/utils/types/experiments'

const props = defineProps<{
  experiment: Experiment;
}>()
</script>
