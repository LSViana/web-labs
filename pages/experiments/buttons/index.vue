<template>
  <NuxtLayout name="home">
    <Container class="p-3 flex flex-col gap-3">
      <p>The <code>primary</code> button:</p>
      <ExperimentCanvas>
        <WlButton variant="primary" @click="onClick">
          Get Started
        </WlButton>
        <template #caption>
          Used to perform the main actions. Clicked <code>{{ counter }}</code> times.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/buttons/WlButton.vue'

const counter = ref(0)

function onClick () {
  counter.value++
}
</script>
