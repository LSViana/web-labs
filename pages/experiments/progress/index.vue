<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The tiled progress bar:</p>
      <ExperimentCanvas>
        <div class="flex">
          <WlProgressBarTile :value="progressTile" :max="10" />
        </div>
        <template #caption>
          Used to show progress when the number of steps is known.
        </template>
      </ExperimentCanvas>
      <p>The track progress bar:</p>
      <ExperimentCanvas>
        <div class="flex">
          <WlProgressBarTrack :value="progressTile" :max="10" />
        </div>
        <template #caption>
          Used to show progress when the precision is lower and/or the number of steps is unknown.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlProgressBarTile from '~/components/experiments/progress/WlProgressBarTile.vue'
import WlProgressBarTrack from '~/components/experiments/progress/WlProgressBarTrack.vue'

const progressTile = ref(5)

setInterval(() => {
  progressTile.value = Math.min(Math.max(progressTile.value + (Math.random() > 0.5 ? -1 : 1), 0), 10)
}, 500)
</script>
