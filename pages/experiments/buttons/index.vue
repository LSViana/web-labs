<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The <code>primary</code> button:</p>
      <ExperimentCanvas>
        <WlButton variant="primary" @click="methods.onClick">
          Get Started
        </WlButton>
        <template #caption>
          Used to perform the main actions. Clicked <code>{{ counter }}</code> times.
        </template>
      </ExperimentCanvas>
      <p>
        The confirm button allows you to perform the main action with a confirmation step:
      </p>
      <ExperimentCanvas>
        <WlConfirmButton variant="danger" @confirm="methods.onConfirm">
          Hold to Delete
        </WlConfirmButton>
        <template #caption>
          Used to confirm important actions. Confirmed: <code>{{ confirmed }}</code>.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/buttons/WlButton.vue'
import WlConfirmButton from '~/components/experiments/buttons/WlConfirmButton.vue'

const counter = ref(0)
const confirmed = ref(false)

const methods = {
  onClick (): void {
    counter.value++
  },
  onConfirm (): void {
    confirmed.value = true
  }
}
</script>
