<template>
  <div class="flex min-h-screen flex-col bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
    <NuxtLoadingIndicator />
    <WlHeader />
    <div class="flex-1">
      <slot />
    </div>
    <WlFooter />
    <ClientOnly>
      <span data-test="hydrated" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import WlFooter from '~~/layers/base/components/surroundings/WlFooter.vue';
import WlHeader from '~~/layers/base/components/surroundings/WlHeader.vue';

useHead({
  titleTemplate: (pageTitle) => {
    return pageTitle
      ? `${pageTitle} - Web Labs`
      : 'Web Labs';
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, user-scalable=no',
    },
  ],
  link: [
    {
      rel: 'icon',
      href: '/img/test-tube.png',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto+Mono&display=swap',
    },
  ],
});
</script>
