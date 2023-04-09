<template>
  <button class="border rounded p-3 hover:border-blue-700 active:text-blue-700 active:bg-blue-100 transition-colors w-full">
    {{ props.experiment.name }}
  </button>
</template>

<script lang="ts" setup>
import { Experiment } from '~/types/experiments'

const props = defineProps<{
  experiment: Experiment;
}>()
</script>
