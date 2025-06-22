<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>Record and then play video & audio:</p>
      <WlExperimentCanvas>
        <div class="flex w-3/4 max-w-full flex-col items-start gap-3">
          <div class="relative aspect-video w-full rounded border bg-slate-100 dark:bg-slate-800">
            <video ref="videoPlayer" controls class="size-full rounded object-cover" />
            <div v-if="isRecording" class="absolute right-2 top-2 flex items-center gap-2 rounded bg-black/50 px-2 py-1 text-white">
              <span class="size-2 animate-pulse rounded-full bg-red-500" />
              <span>{{ formattedRecordingTime }}</span>
            </div>
          </div>
          <div class="flex w-full flex-wrap gap-2">
            <WlButton variant="secondary" class="flex-1" @click="listeners.recording">
              {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
            </WlButton>
            <WlButton
              v-if="recordingUrl"
              variant="primary"
              class="flex-1"
              @click="listeners.downloadRecording"
            >
              Download Recording
            </WlButton>
          </div>
          <div
            v-if="errorMessage"
            class="flex items-baseline gap-2 text-red-500 dark:text-red-300"
          >
            <WlTriangleExclamationIcon class="translate-y-0.5" />
            <span>{{ errorMessage }}</span>
          </div>
        </div>
        <template #caption>
          Record video and audio from your camera and microphone. Download your recordings when finished.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue';

import WlTriangleExclamationIcon from '~~/layers/base/components/icons/static/WlTriangleExclamationIcon.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';

const isRecording = ref(false);
const errorMessage = ref('');
const videoPlayer = ref<HTMLVideoElement>();
const recordingUrl = ref<string>('');
const recordingStartTime = ref<number>(0);
const recordingTime = ref<number>(0);

const formattedRecordingTime = computed(() => {
  const minutes = Math.floor(recordingTime.value / 60).toString().padStart(2, '0');
  const seconds = (recordingTime.value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
});

let recordingStream: MediaStream | null = null;
let recordingRecorder: MediaRecorder | null = null;
let recordingChunks: Blob[] = [];
let recordingInterval: number | null = null;

const listeners = {
  recording: async () => {
    if (isRecording.value) {
      await listeners.stopRecording();
    }
    else {
      await listeners.startRecording();
    }
  },
  startRecording: async () => {
    try {
      errorMessage.value = '';
      recordingUrl.value = '';

      if (!videoPlayer.value) {
        return;
      }

      // Request permissions with constraints.
      recordingStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      recordingChunks = [];

      // Check for browser support of various codecs.
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : 'video/mp4';

      recordingRecorder = new MediaRecorder(recordingStream, { mimeType });
      recordingRecorder.addEventListener('dataavailable', listeners.recorderDataAvailable);
      recordingRecorder.addEventListener('stop', listeners.recorderStop);
      recordingRecorder.addEventListener('error', listeners.recorderError);
      recordingRecorder.start(1000); // Collect data every second.

      videoPlayer.value.srcObject = recordingStream;
      videoPlayer.value.muted = true; // Prevent feedback.
      videoPlayer.value.play();

      // Start recording timer.
      recordingTime.value = 0;
      recordingStartTime.value = Date.now();
      recordingInterval = window.setInterval(() => {
        recordingTime.value = Math.floor((Date.now() - recordingStartTime.value) / 1000);
      }, 1000);

      isRecording.value = true;
    }
    catch (error) {
      console.error('Recording error:', error);
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage.value = 'You need to grant permission to use the camera and microphone';
            break;
          case 'NotFoundError':
            errorMessage.value = 'No camera or microphone found on your device';
            break;
          case 'NotReadableError':
            errorMessage.value = 'Your camera or microphone is already in use';
            break;
          case 'OverconstrainedError':
            errorMessage.value = 'The requested media settings are not available on your device';
            break;
          default:
            errorMessage.value = `Error accessing media: ${error.name}`;
        }
      }
      else {
        errorMessage.value = 'An error occurred while recording';
      }

      isRecording.value = false;
    }
  },
  stopRecording: async () => {
    if (recordingRecorder && recordingRecorder.state !== 'inactive') {
      recordingRecorder.stop();
    }

    // Clear recording timer.
    if (recordingInterval) {
      clearInterval(recordingInterval);
      recordingInterval = null;
    }

    isRecording.value = false;
    await listeners.disposeRecording();
  },
  disposeRecording: async () => {
    if (recordingStream) {
      recordingStream.getTracks().forEach(track => track.stop());
      recordingStream = null;
    }

    if (videoPlayer.value?.srcObject instanceof MediaStream) {
      videoPlayer.value.srcObject = null;
    }
  },
  recorderDataAvailable: (event: BlobEvent) => {
    if (event.data.size > 0) {
      recordingChunks.push(event.data);
    }
  },
  recorderStop: () => {
    try {
      const blob = new Blob(recordingChunks, { type: recordingRecorder?.mimeType || 'video/webm' });
      const url = URL.createObjectURL(blob);
      recordingUrl.value = url;

      if (videoPlayer.value) {
        videoPlayer.value.srcObject = null;
        videoPlayer.value.src = url;
        videoPlayer.value.muted = false;
        videoPlayer.value.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
    }
    catch (error) {
      console.error('Error processing recording:', error);
      errorMessage.value = 'Error processing recording';
    }
  },
  recorderError: (event: Event) => {
    console.error('MediaRecorder error:', event);
    errorMessage.value = 'Recording error occurred';
    listeners.stopRecording();
  },
  downloadRecording: () => {
    if (!recordingUrl.value) return;

    const anchor = document.createElement('a');
    anchor.href = recordingUrl.value;
    anchor.download = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  },
};

// Clean up resources when component is unmounted.
onBeforeUnmount(() => {
  listeners.stopRecording();

  // Revoke any object URLs to prevent memory leaks.
  if (recordingUrl.value) {
    URL.revokeObjectURL(recordingUrl.value);
  }
});
</script>
