<template>
  <NuxtLayout name="home">
    <WlContainer class="p-3">
      <WlPomodoroAuthForm/>
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlPomodoroAuthForm from '~/components/applications/pomodoro/WlPomodoroAuthForm.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'
</script>
