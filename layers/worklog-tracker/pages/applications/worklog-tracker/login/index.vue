<template>
  <NuxtLayout name="home">
    <WlContainer class="p-3">
      <WlWorklogAuthForm />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlWorklogAuthForm from '~~/layers/worklog-tracker/components/WlWorklogAuthForm.vue';
</script>
