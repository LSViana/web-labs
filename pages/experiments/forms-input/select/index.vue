<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The tab select:</p>
      <WlExperimentCanvas>
        <div class="flex">
          <WlTabSelect v-model:value="tab" :options="options" />
        </div>
        <template #caption>
          Used to select one of a <b>few</b> possible values.
        </template>
      </WlExperimentCanvas>
      <p>The pricing plan select:</p>
      <WlExperimentCanvas>
        <div class="flex">
          <WlPricingPlanSelect v-model:value="plan" />
        </div>
        <template #caption>
          Used to select one of multiple pricing plans.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import WlPricingPlanSelect from '~/components/experiments/forms-input/select/WlPricingPlanSelect.vue'
import WlTabSelect from '~/components/experiments/forms-input/select/WlTabSelect.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

const tab = ref(0)
const options = computed(() => ['Home', 'Features', 'Engineering', 'Pricing'])
const plan = ref(0)
</script>
