<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="flex gap-3 p-3">
        <WlPomodoro @interval="listeners.interval" @play="listeners.play"/>
        <WlPomodoroOverview :records="pomodoroRecorder.records.value"/>
      </div>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import WlPomodoro from '~/components/applications/pomodoro/WlPomodoro.vue'
import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import WlPomodoroOverview from '~/components/applications/pomodoro/WlPomodoroOverview.vue'
import { usePomodoroRecorder } from '~/components/applications/pomodoro/usePomodoroRecorder'

const pomodoroRecorder = usePomodoroRecorder()

const listeners = {
  interval(interval: PomodoroInterval): void {
    pomodoroRecorder.save(interval)
  },
  play(): void {
    pomodoroRecorder.record()
  }
}
</script>
