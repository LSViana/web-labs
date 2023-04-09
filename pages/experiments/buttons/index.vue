<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The <code>primary</code> button:</p>
      <ExperimentCanvas>
        <BtnButton variant="primary">
          Get Started
        </BtnButton>
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
import BtnButton from '~/components/experiments/buttons/BtnButton.vue'
</script>
