<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The scrollable stack:</p>
      <WlExperimentCanvas>
        <WlScrollStackAnimatedContainer>
          <div
            v-for="i in 15"
            :key="i"
            class="flex size-32 shrink-0 items-center justify-center rounded border text-slate-800"
            :style="{ backgroundColor: `hsl(${i * 10 + 30}deg, 100%, 50%)`, borderColor: `hsl(${i * 10 + 30}deg, 100%, 40%)` }"
          >
            {{ i }}
          </div>
        </WlScrollStackAnimatedContainer>
        <template #caption>
          Used to show multiple cards in an animated stack list as the box scrolls.
        </template>
      </WlExperimentCanvas>
      <p>
        The
        <a href="https://developer.chrome.com/articles/scroll-driven-animations/" class="underline" target="_blank">
          <span>scroll-driven animation</span>
        </a>:
      </p>
      <WlExperimentCanvas>
        <WlScrollDrivenAnimation />
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlExperimentCanvas from '~~/layers/base/components/experiments/WlExperimentCanvas.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlScrollDrivenAnimation from '~~/layers/experiments/components/micro-interactions/scroll/WlScrollDrivenAnimation.vue';
import WlScrollStackAnimatedContainer from '~~/layers/experiments/components/micro-interactions/scroll/WlScrollStackAnimatedContainer.vue';
</script>
