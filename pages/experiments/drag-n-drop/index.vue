<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The component used to toggle between mutually exclusive states:</p>
      <ExperimentCanvas>
        <WlSwitchDragAndDrop v-model:value="switchValue" :options="5" />
        <template #caption>
          Used to enable/disable something.
        </template>
      </ExperimentCanvas>
      <p>The component used to confirm before performing operations:</p>
      <ExperimentCanvas>
        <WlSwitchDragToConfirmShutdown @confirm="methods.onConfirm" />
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
import WlSwitchDragAndDrop from '~/components/experiments/forms/switch/WlSwitchDragAndDrop.vue'
import WlSwitchDragToConfirmShutdown from '~/components/experiments/forms/switch/WlSwitchDragToConfirmShutdown.vue'

const switchValue = ref(1)
const confirmed = ref(false)

const methods = {
  onConfirm (): void {
    confirmed.value = true
  }
}
</script>
