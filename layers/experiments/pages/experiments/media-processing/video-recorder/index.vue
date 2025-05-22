<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>Record and then play video & audio:</p>
      <WlExperimentCanvas>
        <div class="flex w-72 max-w-full flex-col items-start gap-3">
          <div class="h-48 w-full rounded border bg-slate-100 dark:bg-slate-800">
            <video ref="videoPlayer" controls class="size-full rounded object-cover" />
          </div>
          <WlButton variant="secondary" class="w-full" @click="listeners.startRecording">
            Start Recording
          </WlButton>
          <div
            v-if="errorMessage"
            class="flex items-baseline gap-2 text-red-500 dark:text-red-300"
          >
            <WlTriangleExclamationIcon class="translate-y-0.5" />
            <span>{{ errorMessage }}</span>
          </div>
        </div>
        <template #caption>
          WIP.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import WlTriangleExclamationIcon from '~~/layers/base/components/icons/static/WlTriangleExclamationIcon.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';

const errorMessage = ref('');
const videoPlayer = ref<HTMLVideoElement>();

const listeners = {
  startRecording: async () => {
    try {
      errorMessage.value = '';

      if (!videoPlayer.value) {
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoPlayer.value.srcObject = stream;
      videoPlayer.value.play();
    }
    catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        errorMessage.value = 'You need to grant permission to use the camera and microphone';
      }
      else {
        errorMessage.value = 'An error occurred while recording';
      }
    }
  },
};
</script>
