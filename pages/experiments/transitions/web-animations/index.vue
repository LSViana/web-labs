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
import WlMovableElementWebAnimationsApi from '~/components/experiments/transitions/WlMovableElementWebAnimationsApi.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
</script>
