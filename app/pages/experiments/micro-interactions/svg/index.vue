<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The animated SVG gradient tracing:</p>
      <WlExperimentCanvas>
        <WlAnimatedSvgGradientTracing />
        <template #caption>
          Demonstration based on the SVG gradient tracing created by
          <a href="https://rauno.me/craft/nextjs" class="underline" target="_blank">Vercel designers</a>.
        </template>
      </WlExperimentCanvas>
      <p>The grainy SVG gradient:</p>
      <WlExperimentCanvas>
        <WlSvgGrainyGradient />
        <template #caption>
          Demonstration based on the SVG grainy gradient effect created by
          <a href="https://css-tricks.com/grainy-gradients/" class="underline" target="_blank">Jimmy Chion</a>.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlExperimentCanvas from '~~/layers/base/components/experiments/WlExperimentCanvas.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlAnimatedSvgGradientTracing from '~~/layers/experiments/components/micro-interactions/svg/WlAnimatedSvgGradientTracing.vue';
import WlSvgGrainyGradient from '~~/layers/experiments/components/micro-interactions/svg/WlSvgGrainyGradient.vue';
</script>
