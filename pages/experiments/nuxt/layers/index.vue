<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h1 class="text-xl">
        Layers
      </h1>
      <p>A component from the <code>sample</code> layer:</p>
      <WlExperimentCanvas>
        <WlComponentLayer />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import WlComponentLayer from '~/layers/sample/components/WlComponentLayer.vue'
</script>
