<template>
  <NuxtLayout name="home">
    <Container>
      <div v-for="group in groups" :key="group.target" class="p-3">
        <p>{{ group.target }}</p>
        <ul class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <li v-for="experiment in group.experiments" :key="experiment.route">
            <ExperimentCard :experiment="experiment" />
          </li>
        </ul>
      </div>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCard from '~/components/shared/experiments/ExperimentCard.vue'

import { Experiment } from '~/utils/types/experiments'

type ExperimentGroup = {
  target: string;
  experiments: Experiment[];
}

const groups: ExperimentGroup[] = [
  {
    target: 'Forms & Input',
    experiments: [
      { name: 'Button', route: '/experiments/button' },
      { name: 'Progress', route: '/experiments/progress' },
      { name: 'Input', route: '/experiments/input' },
      { name: 'Select', route: '/experiments/select' },
      { name: 'Badge', route: '/experiments/badge' }
    ]
  },
  {
    target: 'Micro-interactions',
    experiments: [
      { name: 'Scroll', route: '/experiments/scroll' },
      { name: 'SVG', route: '/experiments/svg' },
      { name: 'Drag & Drop', route: '/experiments/drag-n-drop' }
    ]
  },
  {
    target: 'Navigation',
    experiments: [
      { name: 'Transitions', route: '/experiments/transitions' }
    ]
  },
  {
    target: 'Authentication',
    experiments: [
      { name: 'Third-party login', route: '/experiments/authentication/third-party-login' }
    ]
  },
  {
    target: 'Real-time Communication',
    experiments: [
      { name: 'Supabase', route: '/experiments/rtc/supabase' }
    ]
  }
]
</script>
