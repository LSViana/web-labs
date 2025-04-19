<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>Authenticate with Google:</p>
      <WlExperimentCanvas>
        <GoogleAuth />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import GoogleAuth from '~~/layers/experiments/components/authentication/GoogleAuth.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
</script>
