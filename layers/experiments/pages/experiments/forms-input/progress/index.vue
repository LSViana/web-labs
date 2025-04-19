<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The tiled progress bar:</p>
      <WlExperimentCanvas>
        <div class="flex">
          <WlProgressBarTile :value="progressTile" :max="10" />
        </div>
        <template #caption>
          Used to show progress when the number of steps is known.
        </template>
      </WlExperimentCanvas>
      <p>The track progress bar:</p>
      <WlExperimentCanvas>
        <div class="flex">
          <WlProgressBarTrack :value="progressTile" :max="10" />
        </div>
        <template #caption>
          Used to show progress when the precision is lower and/or the number of steps is unknown.
        </template>
      </WlExperimentCanvas>
      <p>The track progress donut:</p>
      <WlExperimentCanvas>
        <div class="flex">
          <WlProgressDonutTrack :value="progressTile" :max="10" />
        </div>
        <template #caption>
          Used to show progress when the precision is lower and/or the number of steps is unknown.
        </template>
      </WlExperimentCanvas>
      <p>
        The battery progress
        (<a
          class="underline"
          href="https://twitter.com/60fpsdesign/status/1718168346699723212"
          target="_blank"
        >source</a>):
      </p>
      <WlExperimentCanvas>
        <div class="flex flex-col items-start gap-5">
          <WlProgressBatteryIndicator :value="charge" :charging="charging" />
          <div class="flex items-center gap-3">
            <input
              v-model="charge"
              type="number"
              min="0"
              max="100"
              class="rounded border bg-slate-200 px-2 py-1 outline-0 dark:bg-slate-800"
              @input="onChargeInput"
            >
            <a href="#" class="underline" @click="charging = !charging">Toggle charging</a>
          </div>
        </div>
        <template #caption>
          Used to show battery percentage with illustrations.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlProgressBarTile from '~~/layers/experiments/components/forms-input/progress/WlProgressBarTile.vue';
import WlProgressBarTrack from '~~/layers/experiments/components/forms-input/progress/WlProgressBarTrack.vue';
import WlProgressBatteryIndicator from '~~/layers/experiments/components/forms-input/progress/WlProgressBatteryIndicator.vue';
import WlProgressDonutTrack from '~~/layers/experiments/components/forms-input/progress/WlProgressDonutTrack.vue';

const progressTile = ref(5);
const charge = ref(56);
const charging = ref(false);

setInterval(() => {
  progressTile.value = Math.min(Math.max(progressTile.value + (Math.random() > 0.5 ? -1 : 1), 0), 10);
}, 500);

function onChargeInput(event: Event): void {
  charge.value = Number((event.target as HTMLInputElement).value);
}
</script>
