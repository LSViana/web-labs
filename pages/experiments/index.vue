<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div v-for="group in groups" :key="group.target" class="p-3">
        <p>{{ group.target }}</p>
        <ul class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <li v-for="experiment in group.experiments" :key="experiment.route">
            <WlExperimentCard :experiment="experiment" />
          </li>
        </ul>
      </div>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlExperimentCard from '~/components/shared/experiments/WlExperimentCard.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import type { Experiment } from '~/utils/types/experiments'

type ExperimentGroup = {
  target: string
  experiments: Experiment[]
}

const groups: ExperimentGroup[] = [
  {
    target: 'Forms & Input',
    experiments: [
      {
        name: 'Button',
        route: '/experiments/forms-input/button',
      },
      {
        name: 'Progress',
        route: '/experiments/forms-input/progress',
      },
      {
        name: 'Input',
        route: '/experiments/forms-input/input',
      },
      {
        name: 'Select',
        route: '/experiments/forms-input/select',
      },
      {
        name: 'Badge',
        route: '/experiments/forms-input/badge',
      },
    ],
  },
  {
    target: 'Micro-interactions',
    experiments: [
      {
        name: 'Scroll',
        route: '/experiments/micro-interactions/scroll',
      },
      {
        name: 'SVG',
        route: '/experiments/micro-interactions/svg',
      },
      {
        name: 'Drag & Drop',
        route: '/experiments/micro-interactions/drag-n-drop',
      },
      {
        name: 'GSAP',
        route: '/experiments/micro-interactions/gsap',
      },
      {
        name: 'Abort Request',
        route: '/experiments/micro-interactions/abort-request',
      },
    ],
  },
  {
    target: 'Transitions',
    experiments: [
      {
        name: 'View Transitions',
        route: '/experiments/transitions/view-transitions',
      },
      {
        name: 'Web Animations',
        route: '/experiments/transitions/web-animations',
      },
    ],
  },
  {
    target: 'Authentication',
    experiments: [
      {
        name: 'Third-party login',
        route: '/experiments/authentication/third-party-login',
      },
    ],
  },
  {
    target: 'Real-time Communication',
    experiments: [
      {
        name: 'Supabase',
        route: '/experiments/rtc/supabase',
      },
    ],
  },
  {
    target: 'Threading',
    experiments: [
      {
        name: 'Web Workers',
        route: '/experiments/threading/web-workers',
      },
    ],
  },
  {
    target: 'Nuxt',
    experiments: [
      {
        name: 'Data Fetching',
        route: '/experiments/nuxt/data-fetching',
      },
      {
        name: 'State Management',
        route: '/experiments/nuxt/state-management',
      },
      {
        name: 'Error Handling',
        route: '/experiments/nuxt/error-handling',
      },
      {
        name: 'Layers',
        route: '/experiments/nuxt/layers',
      },
    ],
  },
]
</script>
