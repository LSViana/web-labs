<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="flex flex-col gap-3 p-3 md:flex-row">
        <WlPomodoro @interval="listeners.interval" @play="listeners.play"/>
        <WlPomodoroOverview
            v-model:date="date"
            :records="records"
            @update:date="listeners.date"
            @update:records="listeners.records"
        />
      </div>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'

import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import type { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { useLeaveConfirmation } from '~/components/applications/pomodoro/useLeaveConfirmation'
import { usePomodoroRecorder } from '~/components/applications/pomodoro/usePomodoroRecorder'
import { usePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import { useToday } from '~/components/applications/pomodoro/useToday'
import WlPomodoro from '~/components/applications/pomodoro/WlPomodoro.vue'
import WlPomodoroOverview from '~/components/applications/pomodoro/WlPomodoroOverview.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

useHead({
  title: 'Pomodoro'
})

const pomodoroRecorder = usePomodoroRecorder()
const pomodoroStorage = usePomodoroStorage()
const leaveConfirmation = useLeaveConfirmation()
const today = useToday()

// The current records being shown in the UI.
// The `pomodoroRecorder` is responsible for saving today's records.
const records = ref<PomodoroRecord[]>([])
const date = ref(today.get())

onMounted(() => {
  // The records are loaded `onMounted` not to cause hydration mismatches.
  records.value = pomodoroStorage.load(date.value)
  pomodoroRecorder.load(records.value)
})

const listeners = {
  interval(interval: PomodoroInterval): void {
    pomodoroRecorder.save(interval.type)
    pomodoroStorage.saveToday(pomodoroRecorder.records.value)
    records.value = pomodoroRecorder.records.value
    leaveConfirmation.release()
  },
  play(): void {
    pomodoroRecorder.record()
    leaveConfirmation.hold()
  },
  date(date: Date): void {
    records.value = pomodoroStorage.load(date)
  },
  records(newRecords: PomodoroRecord[]): void {
    pomodoroStorage.save(date.value, newRecords)
    records.value = newRecords
  }
}
</script>
