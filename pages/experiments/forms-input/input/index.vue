<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The password strength meter (input is just for decoration):</p>
      <WlExperimentCanvas>
        <div class="flex w-56 flex-col">
          <WlInput v-model="password" type="password">
            <WlPasswordStrength :value="password"/>
          </wlinput>
        </div>
        <template #caption>
          Used to demonstrate to the user the strength of their password. For this example, length is strength.
        </template>
      </WlExperimentCanvas>
      <p>The number input with an animated display:</p>
      <WlExperimentCanvas>
        <div class="flex w-56 flex-col">
          <WlInput v-model="amount" type="number"/>
          <div class="mt-3 flex h-6 items-center gap-1">
            <small>US$</small>
            <WlNumberDisplay :value="amount"/>
          </div>
        </div>
      </WlExperimentCanvas>
      <p>The time input:</p>
      <WlExperimentCanvas>
        <WlTimeInput v-model="datetime"/>
        <p class="mt-3">Time: <code>{{ datetime.toLocaleString() }}</code></p>
      </WlExperimentCanvas>
      <p>The date input:</p>
      <WlExperimentCanvas>
        <WlDateInput v-model="datetime"/>
        <p class="mt-3">Date: <code>{{ datetime.toLocaleString() }}</code></p>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import WlDateInput from '~/components/experiments/forms-input/input/WlDateInput.vue'
import WlInput from '~/components/experiments/forms-input/input/WlInput.vue'
import WlNumberDisplay from '~/components/experiments/forms-input/input/WlNumberDisplay.vue'
import WlPasswordStrength from '~/components/experiments/forms-input/input/WlPasswordStrength.vue'
import WlTimeInput from '~/components/experiments/forms-input/input/WlTimeInput.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

const password = ref('')
const amount = ref(0)
const datetime = ref(new Date())
</script>
