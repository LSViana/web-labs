<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The tab select:</p>
      <ExperimentCanvas>
        <div class="flex">
          <WlTabSelect v-model:value="tab" :options="options" />
        </div>
        <template #caption>
          Used to select one of a <b>few</b> possible values.
        </template>
      </ExperimentCanvas>
      <p>The pricing plan select:</p>
      <ExperimentCanvas>
        <div class="flex">
          <WlPricingPlanSelect v-model:value="plan" />
        </div>
        <template #caption>
          Used to select one of multiple pricing plans.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlTabSelect from '~/components/experiments/forms/select/WlTabSelect.vue'
import WlPricingPlanSelect from '~/components/experiments/forms/select/WlPricingPlanSelect.vue'

const tab = ref(0)
const options = computed(() => ['Home', 'Features', 'Engineering', 'Pricing'])
const plan = ref(0)
</script>
