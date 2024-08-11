<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="inline-flex p-3">
        <WlPomodoro/>
      </div>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import WlPomodoro from '~/components/applications/pomodoro/WlPomodoro.vue'
</script>
