<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The animated SVG gradient tracing:</p>
      <ExperimentCanvas>
        <WlAnimatedSvgGradientTracing />
        <template #caption>
          Demonstration based on the SVG gradient tracing created by
          <a href="https://rauno.me/craft/nextjs" class="underline" target="_blank">Vercel designers</a>.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlAnimatedSvgGradientTracing from '~/components/experiments/svg/WlAnimatedSvgGradientTracing.vue'
</script>
