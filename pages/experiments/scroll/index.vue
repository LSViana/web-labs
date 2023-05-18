<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The scrollable stack:</p>
      <ExperimentCanvas>
        <WlScrollStackAnimatedContainer>
          <div
            v-for="i in 15"
            :key="i"
            class="flex h-32 w-32 shrink-0 items-center justify-center rounded border text-slate-800"
            :style="{ backgroundColor: `hsl(${i * 10 + 30}deg, 100%, 50%)`, borderColor: `hsl(${i * 10 + 30}deg, 100%, 40%)` }"
          >
            {{ i }}
          </div>
        </WlScrollStackAnimatedContainer>
        <template #caption>
          Used to show multiple cards in an animated stack list as the box scrolls.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlScrollStackAnimatedContainer from '~/components/experiments/scroll/WlScrollStackAnimatedContainer.vue'
</script>
