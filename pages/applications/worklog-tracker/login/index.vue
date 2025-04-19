<template>
  <NuxtLayout name="home">
    <WlContainer class="p-3">
      <WlWorklogAuthForm />
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlWorklogAuthForm from '~/components/applications/worklog-tracker/WlWorklogAuthForm.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
</script>
