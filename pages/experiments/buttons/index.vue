<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The <code>primary</code> button:</p>
      <ExperimentCanvas>
        <WlButton variant="primary">
          Get Started
        </WlButton>
        <template #caption>
          Used to perform the main actions.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/buttons/WlButton.vue'
</script>
