<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>A simple animation example:</p>
      <WlExperimentCanvas>
        <WlGsapSimpleAnimation />
      </WlExperimentCanvas>
      <p>A staggered animation example:</p>
      <WlExperimentCanvas>
        <WlGsapStaggeredAnimation />
      </WlExperimentCanvas>
      <p>A raw object animation example:</p>
      <WlExperimentCanvas>
        <WlGsapRawObjectAnimationVue />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlGsapRawObjectAnimationVue from '~/components/experiments/micro-interactions/gsap/WlGsapRawObjectAnimation.vue'
import WlGsapSimpleAnimation from '~/components/experiments/micro-interactions/gsap/WlGsapSimpleAnimation.vue'
import WlGsapStaggeredAnimation from '~/components/experiments/micro-interactions/gsap/WlGsapStaggeredAnimation.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
</script>
