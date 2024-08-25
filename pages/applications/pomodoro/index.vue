<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="flex flex-col gap-3 p-3 md:flex-row">
        <WlPomodoroClock @interval="listeners.interval" @play="listeners.play"/>
        <WlPomodoroOverview
            v-model:date="date"
            :records="pomodoroRecords.value"
            @update:date="listeners.date"
            @create="listeners.add"
            @update="listeners.update"
            @remove="listeners.remove"
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
import { usePomodoroRecords } from '~/components/applications/pomodoro/usePomodoroRecords'
import { usePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import { useToday } from '~/components/applications/pomodoro/useToday'
import WlPomodoroClock from '~/components/applications/pomodoro/WlPomodoroClock.vue'
import WlPomodoroOverview from '~/components/applications/pomodoro/WlPomodoroOverview.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

useHead({
  title: 'Pomodoro'
})

const pomodoroRecorder = usePomodoroRecorder()
const pomodoroStorage = usePomodoroStorage()
const pomodoroRecords = usePomodoroRecords()
const leaveConfirmation = useLeaveConfirmation()
const today = useToday()

const date = ref(today.get())

onMounted(() => {
  // The records are loaded `onMounted` not to cause hydration mismatches.
  pomodoroRecords.load(pomodoroStorage.loadToday())
})

const listeners = {
  interval(interval: PomodoroInterval): void {
    const record = pomodoroRecorder.capture(interval.type)

    if (record) {
      pomodoroRecords.add(record)
      pomodoroStorage.saveToday(pomodoroRecords.value)
    }

    leaveConfirmation.release()
  },
  play(): void {
    pomodoroRecorder.record()
    leaveConfirmation.hold()
  },
  date(date: Date): void {
    pomodoroRecords.load(pomodoroStorage.load(date))
  },
  add(newRecord: PomodoroRecord): void {
    pomodoroRecords.add(newRecord)
    pomodoroStorage.save(date.value, pomodoroRecords.value)
  },
  update(newRecord: PomodoroRecord, index: number): void {
    pomodoroRecords.update(newRecord, index)
    pomodoroStorage.save(date.value, pomodoroRecords.value)
  },
  remove(index: number): void {
    pomodoroRecords.remove(index)
    pomodoroStorage.save(date.value, pomodoroRecords.value)
  }
}
</script>
