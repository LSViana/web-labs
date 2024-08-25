<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="flex flex-col gap-3 p-3 md:flex-row">
        <WlPomodoroClock @interval="listeners.interval" @play="listeners.play" @notification="listeners.notification"/>
        <WlPomodoroOverview
            v-model:date="date"
            :records="records.value"
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
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { useLeaveConfirmation } from '~/components/applications/pomodoro/useLeaveConfirmation'
import { usePomodoroNotification } from '~/components/applications/pomodoro/usePomodoroNotification'
import { usePomodoroRecorder } from '~/components/applications/pomodoro/usePomodoroRecorder'
import { usePomodoroRecords } from '~/components/applications/pomodoro/usePomodoroRecords'
import { usePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import { usePomodoroToday } from '~/components/applications/pomodoro/usePomodoroToday'
import WlPomodoroClock from '~/components/applications/pomodoro/WlPomodoroClock.vue'
import WlPomodoroOverview from '~/components/applications/pomodoro/WlPomodoroOverview.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

useHead({
  title: 'Pomodoro'
})

const recorder = usePomodoroRecorder()
const storage = usePomodoroStorage()
const records = usePomodoroRecords()
const notification = usePomodoroNotification()
const today = usePomodoroToday()

const leaveConfirmation = useLeaveConfirmation()

const date = ref(today.get())

onMounted(() => {
  // The records are loaded `onMounted` not to cause hydration mismatches.
  records.load(storage.loadToday())
})

const listeners = {
  interval(interval: PomodoroInterval): void {
    const record = recorder.capture(interval.type)

    if (record) {
      records.add(record)
      storage.saveToday(records.value)
    }

    leaveConfirmation.release()
  },
  play(): void {
    recorder.record()
    leaveConfirmation.hold()
    notification.requestPermission()
  },
  notification(type: PomodoroIntervalType): void {
    notification.notify(type)
  },
  date(date: Date): void {
    records.load(storage.load(date))
  },
  add(newRecord: PomodoroRecord): void {
    records.add(newRecord)
    storage.save(date.value, records.value)
  },
  update(newRecord: PomodoroRecord, index: number): void {
    records.update(newRecord, index)
    storage.save(date.value, records.value)
  },
  remove(index: number): void {
    records.remove(index)
    storage.save(date.value, records.value)
  }
}
</script>
