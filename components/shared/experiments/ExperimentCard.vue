<template>
  <NuxtLink
    class="
      border rounded p-3 hover:border-slate-400
      active:bg-slate-300
      dark:active:text-slate-50 dark:active:bg-slate-700
      transition-colors block text-center
    "
    :to="props.experiment.route"
  >
    {{ props.experiment.name }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import { Experiment } from '~/types/experiments'

const props = defineProps<{
  experiment: Experiment;
}>()
</script>
