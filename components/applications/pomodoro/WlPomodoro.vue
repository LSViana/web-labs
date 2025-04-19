<template>
  <div class="flex items-center justify-between">
    <h1 class="text-xl">
      Pomodoro
    </h1>
    <div class="flex items-center gap-3">
      <a href="#" class="underline" @click="listeners.logout">Logout</a>
    </div>
  </div>
  <div class="flex gap-3 md:flex-row">
    <WlPomodoroClock @interval="listeners.interval" @play="listeners.play" @notification="listeners.notification" />
    <WlPomodoroOverview
      v-model:date="date"
      :records="records.value"
      @update:date="listeners.date"
      @create="listeners.add"
      @update="listeners.update"
      @remove="listeners.remove"
    />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'

import { useRouter } from '#app'
import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { useLeaveConfirmation } from '~/components/applications/pomodoro/useLeaveConfirmation'
import { usePomodoroNotification } from '~/components/applications/pomodoro/usePomodoroNotification'
import { usePomodoroRecorder } from '~/components/applications/pomodoro/usePomodoroRecorder'
import { usePomodoroRecords } from '~/components/applications/pomodoro/usePomodoroRecords'
import { usePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import { usePomodoroToday } from '~/components/applications/pomodoro/usePomodoroToday'
import WlPomodoroClock from '~/components/applications/pomodoro/WlPomodoroClock.vue'
import WlPomodoroOverview from '~/components/applications/pomodoro/WlPomodoroOverview.vue'
import { useProductivityAuth } from '~/composables/productivity/useProductivityAuth'
import type { PomodoroRecord } from '~/composables/server/pomodoro/types/pomodoroRecord'

useHead({
  title: 'Pomodoro',
})

const router = useRouter()

const auth = useProductivityAuth()
const recorder = usePomodoroRecorder()
const storage = usePomodoroStorage()
const records = usePomodoroRecords()
const notification = usePomodoroNotification()
const today = usePomodoroToday()

const leaveConfirmation = useLeaveConfirmation()

const date = ref(today.get())

onMounted(async () => {
  // The records are loaded `onMounted` not to cause hydration mismatches.
  const pomodoroRecords = await storage.loadToday()

  records.load(pomodoroRecords)
})

const listeners = {
  async interval(interval: PomodoroInterval): Promise<void> {
    const record = recorder.capture(interval.type)

    if (!record) {
      return
    }

    if (!today.isSameDay(date.value, record.startTime)) {
      date.value = record.startTime
      const pomodoroRecords = await storage.load(record.startTime)

      records.load(pomodoroRecords)
    }

    records.add(record)
    storage.save(record)

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
  async date(date: Date): Promise<void> {
    const pomodoroRecords = await storage.load(date)

    records.load(pomodoroRecords)
  },
  async add(newRecord: PomodoroRecord): Promise<void> {
    records.add(newRecord)
    await storage.save(newRecord)
  },
  async update(newRecord: PomodoroRecord, index: number): Promise<void> {
    records.update(newRecord, index)
    await storage.update(newRecord)
  },
  async remove(index: number): Promise<void> {
    const record = records.value[index]

    if (!record) {
      return
    }

    records.remove(index)
    await storage.remove(record)
  },
  async logout(): Promise<void> {
    await auth.logout()
    await router.push('/applications/pomodoro/login')
  },
}
</script>
