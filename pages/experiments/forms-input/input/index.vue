<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The password strength meter (input is just for decoration):</p>
      <ExperimentCanvas>
        <div class="flex w-56 flex-col">
          <input
            v-model="password"
            type="password"
            class="rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-800"
          >
          <WlPasswordStrength :value="password" />
        </div>
        <template #caption>
          Used to demonstrate to the user the strength of their password. For this example, length is strength.
        </template>
      </ExperimentCanvas>
      <p>The number input with an animated display:</p>
      <ExperimentCanvas>
        <div class="flex w-56 flex-col">
          <input
            v-model="amount"
            type="number"
            class="rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-800"
          >
          <div class="mt-3 flex h-6 items-center gap-1">
            <small>US$</small>
            <WlNumberDisplay :value="amount" />
          </div>
        </div>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlPasswordStrength from '~/components/experiments/input/WlPasswordStrength.vue'
import WlNumberDisplay from '~/components/experiments/input/WlNumberDisplay.vue'

const password = ref('')
const amount = ref(0)
</script>
