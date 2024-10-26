<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h1 class="text-xl">Data Fetching in Nuxt</h1>
      <p>Nuxt offers three different methods to fetch data:</p>
      <ol class="list-inside list-decimal">
        <li><code class="text-code-400">$fetch()</code></li>
        <li><code class="text-code-400">useFetch()</code></li>
        <li><code class="text-code-400">useAsyncData()</code></li>
      </ol>
      <p>
        The following experiments detail each one of these methods
        (you may need to use the DevTools to understand it better).
      </p>
      <h2 class="mt-3 text-lg"><code>$fetch()</code></h2>
      <p>Fetches data both on server and client side (check server console):</p>
      <WlExperimentCanvas>
        <p><code>$fetch()</code> = <code>{{ data.fetch }}</code></p>
      </WlExperimentCanvas>
      <h2 class="mt-3 text-lg"><code>useFetch()</code></h2>
      <p>Fetches data both only on server (unless client-side navigation happens):</p>
      <WlExperimentCanvas>
        <p><code>useFetch()</code> = <code>{{ data.useFetch }}</code></p>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import { useFetch } from '#app'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

const data = reactive({
  fetch: 0,
  useFetch: 0
})

const fetchResponse = await $fetch('/api/data-fetching/nuxt/fetch')
data.fetch = fetchResponse.value

const useFetchResponse = await useFetch('/api/data-fetching/nuxt/use-fetch')
data.useFetch = useFetchResponse.data.value!.value
</script>

