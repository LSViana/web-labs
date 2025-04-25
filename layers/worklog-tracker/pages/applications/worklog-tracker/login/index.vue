<template>
  <NuxtLayout name="home">
    <WlContainer class="p-3">
      <WlWorklogAuthForm />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { definePageMeta, navigateTo, useProductivityAuth } from '#imports';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlWorklogAuthForm from '~~/layers/worklog-tracker/components/WlWorklogAuthForm.vue';

definePageMeta({
  middleware: () => {
    const auth = useProductivityAuth();

    if (auth.authenticated.value) {
      return navigateTo('/applications/worklog-tracker');
    }
  },
});
</script>
