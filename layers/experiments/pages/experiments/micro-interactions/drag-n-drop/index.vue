<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The component used to toggle between mutually exclusive states:</p>
      <WlExperimentCanvas>
        <WlSwitchDragAndDrop v-model:value="switchValue" :options="5" />
        <template #caption>
          Used to enable/disable something. Drag the active item to another position to change the value.
        </template>
      </WlExperimentCanvas>
      <p>The component used to confirm before performing operations:</p>
      <WlExperimentCanvas>
        <WlSwitchDragToConfirmShutdown @confirm="methods.onConfirm" />
        <template #caption>
          Used to confirm important actions. Confirmed: <code>{{ confirmed }}</code>.
        </template>
      </WlExperimentCanvas>
      <p>The component used to receive file uploads:</p>
      <WlExperimentCanvas>
        <WlFileInput v-model:value="files" accept="image/png" multiple />
        <template #caption>
          Used to allow the user to upload files. Accepts multiple PNG images.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlFileInput from '~~/layers/experiments/components/forms-input/file/WlFileInput.vue';
import WlSwitchDragAndDrop from '~~/layers/experiments/components/forms-input/switch/WlSwitchDragAndDrop.vue';
import WlSwitchDragToConfirmShutdown from '~~/layers/experiments/components/forms-input/switch/WlSwitchDragToConfirmShutdown.vue';

const switchValue = ref(1);
const confirmed = ref(false);
const files = ref<FileList>();

const methods = {
  onConfirm(): void {
    confirmed.value = true;
  },
};
</script>
