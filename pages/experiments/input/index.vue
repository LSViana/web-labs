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
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlPasswordStrength from '~/components/experiments/input/WlPasswordStrength.vue'

const password = ref('')
</script>
