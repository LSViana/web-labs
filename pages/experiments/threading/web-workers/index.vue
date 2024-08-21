<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The single-threaded computation:</p>
      <WlExperimentCanvas>
        <p>Result: <code class="inline-block w-[96px]">{{ singleThread.result }}</code> | Duration: <code>{{ singleThread.duration }}ms</code></p>
        <WlButton variant="secondary" class="mt-2 flex items-center gap-2" @click="listeners.singleThreadClick">
          Calculate
        </WlButton>
      </WlExperimentCanvas>
      <p>The multi-threaded computation:</p>
      <WlExperimentCanvas>
        <p>Result: <code class="inline-block w-[96px]">{{ multiThread.result }}</code> | Duration: <code>{{ multiThread.duration }}ms</code></p>
        <WlButton variant="secondary" class="mt-2 flex items-center gap-2" @click="listeners.multiThreadClick">
          Calculate
        </WlButton>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import useFibonacci from '~/composables/threading/fibonacci'

const iterations = 40
const fibonacci = useFibonacci()

const singleThread = reactive({
  result: 0,
  duration: 0
})
const multiThread = reactive({
  result: 0,
  duration: 0
})

const listeners = {
  singleThreadClick(): void {
    // Reset the state
    singleThread.result = 0
    singleThread.duration = 0

    // Calculate measuring performance
    const now = performance.now()
    singleThread.result = fibonacci.calculate(iterations)
    singleThread.duration = Math.round(performance.now() - now)
  },
  async multiThreadClick(): Promise<void> {
    // Reset the state
    multiThread.result = 0
    multiThread.duration = 0

    // Calculate measuring performance
    const now = performance.now()
    multiThread.result = await fibonacci.calculateAsync(iterations)
    multiThread.duration = Math.round(performance.now() - now)
  }
}
</script>
