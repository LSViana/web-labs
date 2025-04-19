<template>
  <WlCard :to="props.experiment.route">
    {{ props.experiment.name }}
  </WlCard>
</template>

<script lang="ts" setup>
import WlCard from '~~/layers/base/components/layout/WlCard.vue';
import type { Experiment } from '~~/layers/base/types/experiments';

const props = defineProps<{
  experiment: Experiment
}>();
</script>
