<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>Authenticate with Google:</p>
      <ExperimentCanvas>
        <GoogleAuth />
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import GoogleAuth from '~/components/experiments/authentication/GoogleAuth.vue'
</script>
