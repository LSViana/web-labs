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
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import GoogleAuth from '~/components/experiments/authentication/GoogleAuth.vue'
</script>
