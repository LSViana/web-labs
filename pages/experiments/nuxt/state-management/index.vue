<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h1 class="text-xl">
        State Management
      </h1>
      <p>Sharing state with the <code>ref()</code> (built-in) composable:</p>
      <WlExperimentCanvas>
        <div class="flex flex-col gap-3">
          <WlNuxtRefCounter />
          <WlNuxtRefCounter />
        </div>
      </WlExperimentCanvas>
      <p>Sharing state with the <code>useState()</code> (Nuxt-provided) composable:</p>
      <WlExperimentCanvas>
        <div class="flex flex-col gap-3">
          <WlNuxtUseStateCounter />
          <WlNuxtUseStateCounter />
        </div>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlNuxtRefCounter from '~/components/experiments/transitions/nuxt/state-management/WlNuxtRefCounter.vue'
import WlNuxtUseStateCounter from '~/components/experiments/transitions/nuxt/state-management/WlNuxtUseStateCounter.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
</script>
