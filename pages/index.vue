<template>
  <NuxtLayout name="home">
    <Container>
      <div class="p-3">
        <p>Experiments on the <b>web platform</b>.</p>
        <ul class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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
  { name: 'Button', route: '/experiments/button' },
  { name: 'Progress', route: '/experiments/progress' },
  { name: 'Input', route: '/experiments/input' },
  { name: 'Select', route: '/experiments/select' },
  { name: 'Badge', route: '/experiments/badge' },
  { name: 'Drag & Drop', route: '/experiments/drag-n-drop' },
  { name: 'SVG', route: '/experiments/svg' }
]
</script>
