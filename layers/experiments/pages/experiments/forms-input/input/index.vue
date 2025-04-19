<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The password strength meter (input is just for decoration):</p>
      <WlExperimentCanvas>
        <div class="flex w-56 flex-col">
          <WlInput v-model="password" type="password">
            <WlPasswordStrength :value="password" />
          </wlinput>
        </div>
        <template #caption>
          Used to demonstrate to the user the strength of their password. For this example, length is strength.
        </template>
      </WlExperimentCanvas>
      <p>The number input with an animated display:</p>
      <WlExperimentCanvas>
        <div class="flex w-56 flex-col">
          <WlInput v-model="amount" type="number" />
          <div class="mt-3 flex h-6 items-center gap-1">
            <small>US$</small>
            <WlNumberDisplay :value="amount" />
          </div>
        </div>
      </WlExperimentCanvas>
      <p>The time input with and without seconds:</p>
      <WlExperimentCanvas>
        <div class="flex gap-3">
          <WlTimeInput v-model="datetime" />
          <WlTimeInput v-model="datetime" show-seconds />
        </div>
        <p class="mt-3">
          Time: <code>{{ datetime.toLocaleString() }}</code>
        </p>
      </WlExperimentCanvas>
      <p>The date input:</p>
      <WlExperimentCanvas>
        <WlDateInput v-model="datetime" />
        <p class="mt-3">
          Date: <code>{{ datetime.toLocaleString() }}</code>
        </p>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import WlExperimentCanvas from '~~/layers/base/components/experiments/WlExperimentCanvas.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlDateInput from '~~/layers/experiments/components/forms-input/input/WlDateInput.vue';
import WlInput from '~~/layers/experiments/components/forms-input/input/WlInput.vue';
import WlNumberDisplay from '~~/layers/experiments/components/forms-input/input/WlNumberDisplay.vue';
import WlPasswordStrength from '~~/layers/experiments/components/forms-input/input/WlPasswordStrength.vue';
import WlTimeInput from '~~/layers/experiments/components/forms-input/input/WlTimeInput.vue';

const password = ref('');
const amount = ref(0);
const datetime = ref(new Date());
</script>
