<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>Animating an element to wherever the user clicks using Web Animations API:</p>
      <WlExperimentCanvas>
        <WlMovableElementWebAnimationsApi />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlExperimentCanvas from '~~/layers/base/components/experiments/WlExperimentCanvas.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlMovableElementWebAnimationsApi from '~~/layers/experiments/components/transitions/WlMovableElementWebAnimationsApi.vue';
</script>
