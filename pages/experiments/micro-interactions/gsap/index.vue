<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>A simple animation example:</p>
      <ExperimentCanvas>
        <WlGsapSimpleAnimation />
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlGsapSimpleAnimation from '~/components/experiments/micro-interactions/gsap/WlGsapSimpleAnimation.vue'
</script>
