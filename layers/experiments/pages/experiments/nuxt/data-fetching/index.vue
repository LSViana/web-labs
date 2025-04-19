<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h1 class="text-xl">
        Data Fetching in Nuxt
      </h1>
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
      <h2 class="mt-3 text-lg">
        <code>$fetch()</code>
      </h2>
      <p>Fetches data both on server and client side (check server console):</p>
      <WlExperimentCanvas>
        <p><code>$fetch()</code> = <code>{{ fetchResponse.value }}</code></p>
      </WlExperimentCanvas>
      <h2 class="mt-3 text-lg">
        <code>useFetch()</code>
      </h2>
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
      <h2 class="mt-3 text-lg">
        <code>useAsyncData()</code>
      </h2>
      <p>Allows loading data asynchronously and passing it from the server to the client:</p>
      <WlExperimentCanvas>
        <p><code>useAsyncData()</code> = <code>{{ useAsyncDataResponse.data.value }}</code></p>
      </WlExperimentCanvas>
      <h2 class="mt-3 text-lg">
        Server-sent Events
      </h2>
      <p>Streaming data from the server using <code>EventSource</code> in the API routes:</p>
      <WlExperimentCanvas>
        <p>Items:</p>
        <ul v-if="data.sse.length">
          <li v-for="item in data.sse" :key="item">
            {{ item }}
          </li>
        </ul>
        <p v-else class="italic">
          (Empty)
        </p>
        <div class="mt-5 flex gap-3">
          <WlButton variant="primary" @click="listeners.sse.request">
            Request
          </WlButton>
          <WlButton variant="secondary" @click="listeners.sse.clear">
            Clear
          </WlButton>
        </div>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

import { useAsyncData, useFetch, useLazyFetch } from '#app';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';

const fetchResponse = await $fetch('/api/nuxt/data-fetching/fetch');

const useFetchResponse = await useFetch('/api/nuxt/data-fetching/use-fetch');

// Works when `await` is used, and it's a client-side navigation.
const useLazyFetchResponse = await useLazyFetch('/api/nuxt/data-fetching/use-lazy-fetch');

// Add timeout to simulate.
const useAsyncDataResponse = await useAsyncData(
  'use-async-data',
  () => new Promise(resolve => setInterval(() => resolve(3), 0)),
);

const data = reactive({
  sse: [] as string[],
});

let reader: ReadableStreamDefaultReader<string>;

const listeners = {
  sse: {
    clear() {
      data.sse = [];

      reader?.cancel('User canceled.');
    },
    async request() {
      const response = await $fetch<ReadableStream<Uint8Array>>('/api/nuxt/data-fetching/sse', {
        method: 'POST',
        responseType: 'stream',
      });

      reader = response.pipeThrough(new TextDecoderStream()).getReader();

      while (reader) {
        const item = await reader.read();

        if (item.done) {
          break;
        }

        data.sse.push(item.value.substring(6));
      }
    },
  },
};
</script>
