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
        <p><code>$fetch()</code> = <code>{{ fetchResponse.value }}</code></p>
      </WlExperimentCanvas>
      <h2 class="mt-3 text-lg"><code>useFetch()</code></h2>
      <p>Fetches data both only on server (unless client-side navigation happens):</p>
      <WlExperimentCanvas>
        <p><code>status</code> = <code>{{ useFetchResponse.status }}</code></p>
        <p><code>useFetch()</code> = <code>{{ useFetchResponse.data.value?.value ?? 0 }}</code></p>
      </WlExperimentCanvas>
      <p>The data can be lazy-loaded not to block the page rendering.</p>
      <WlExperimentCanvas>
        <p><code>status</code> = <code>{{ useLazyFetchResponse.status }}</code></p>
        <p><code>useFetch()</code> = <code>{{ useLazyFetchResponse.data.value?.value ?? 0 }}</code></p>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useFetch, useLazyFetch } from '#app'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

const fetchResponse = await $fetch('/api/data-fetching/nuxt/fetch')

const useFetchResponse = await useFetch('/api/data-fetching/nuxt/use-fetch')

// Works when `await` is used, and it's a client-side navigation.
const useLazyFetchResponse = await useLazyFetch('/api/data-fetching/nuxt/use-lazy-fetch')
</script>

