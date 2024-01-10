<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The component used to toggle between mutually exclusive states:</p>
      <ExperimentCanvas>
        <WlSwitchDragAndDrop v-model:value="switchValue" :options="5" />
        <template #caption>
          Used to enable/disable something. Drag the active item to another position to change the value.
        </template>
      </ExperimentCanvas>
      <p>The component used to confirm before performing operations:</p>
      <ExperimentCanvas>
        <WlSwitchDragToConfirmShutdown @confirm="methods.onConfirm" />
        <template #caption>
          Used to confirm important actions. Confirmed: <code>{{ confirmed }}</code>.
        </template>
      </ExperimentCanvas>
      <p>The component used to receive file uploads:</p>
      <ExperimentCanvas>
        <WlFileInput v-model:value="files" accept="image/png" multiple />
        <template #caption>
          Used to allow the user to upload files. Accepts multiple PNG images.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlSwitchDragAndDrop from '~/components/experiments/forms-input/switch/WlSwitchDragAndDrop.vue'
import WlSwitchDragToConfirmShutdown from '~/components/experiments/forms-input/switch/WlSwitchDragToConfirmShutdown.vue'
import WlFileInput from '~/components/experiments/forms-input/file/WlFileInput.vue'

const switchValue = ref(1)
const confirmed = ref(false)
const files = ref<FileList>()

const methods = {
  onConfirm(): void {
    confirmed.value = true
  }
}
</script>
