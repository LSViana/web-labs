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
import { usePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import { onMounted } from 'vue'
import { useLeaveConfirmation } from '~/components/applications/pomodoro/useLeaveConfirmation'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Pomodoro'
})

const pomodoroRecorder = usePomodoroRecorder()
const pomodoroStorage = usePomodoroStorage()
const leaveConfirmation = useLeaveConfirmation()

onMounted(() => {
  // The records are loaded `onMounted` not to cause hydration mismatches.
  pomodoroRecorder.load(pomodoroStorage.loadToday())
})

const listeners = {
  interval(interval: PomodoroInterval): void {
    pomodoroRecorder.save(interval)
    pomodoroStorage.saveToday(pomodoroRecorder.records.value)
    leaveConfirmation.release()
  },
  play(): void {
    pomodoroRecorder.record()
    leaveConfirmation.hold()
  }
}
</script>
