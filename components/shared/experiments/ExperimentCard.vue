<template>
  <WlCard :to="props.experiment.route">
    {{ props.experiment.name }}
  </WlCard>
</template>

<script lang="ts" setup>
import WlCard from '~/components/experiments/card/WlCard.vue'

import type { Experiment } from '~/utils/types/experiments'

const props = defineProps<{
  experiment: Experiment;
}>()
</script>
