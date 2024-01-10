<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>A simple animation example:</p>
      <ExperimentCanvas>
        <WlGsapSimpleAnimation />
      </ExperimentCanvas>
      <p>A staggered animation example:</p>
      <ExperimentCanvas>
        <WlGsapStaggeredAnimation />
      </ExperimentCanvas>
      <p>A raw object animation example:</p>
      <ExperimentCanvas>
        <WlGsapRawObjectAnimationVue />
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlGsapSimpleAnimation from '~/components/experiments/micro-interactions/gsap/WlGsapSimpleAnimation.vue'
import WlGsapStaggeredAnimation from '~/components/experiments/micro-interactions/gsap/WlGsapStaggeredAnimation.vue'
import WlGsapRawObjectAnimationVue from '~/components/experiments/micro-interactions/gsap/WlGsapRawObjectAnimation.vue'
</script>
