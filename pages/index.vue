<template>
  <NuxtLayout name="home">
    <Container>
      <div class="p-3">
        <p>Experiments on the <b>web platform</b>.</p>
        <ul class="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <li v-for="experiment in experiments" :key="experiment.route">
            <ExperimentCard :experiment="experiment" />
          </li>
        </ul>
      </div>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Experiment } from '~/types/experiments'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCard from '~/components/shared/experiments/ExperimentCard.vue'

const experiments: Experiment[] = [
  { name: 'Buttons', route: '/experiments/buttons' },
  { name: 'Drag & Drop', route: '/experiments/drag-n-drop' }
]
</script>
