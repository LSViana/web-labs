<template>
  <div class="flex items-center justify-between">
    <h1 class="text-xl">
      Pomodoro
    </h1>
    <div class="flex items-center gap-3">
      <WlDateInput v-model="date" @update:model-value="listeners.date" />
      <a href="#" class="underline" @click="listeners.logout">Logout</a>
    </div>
  </div>
  <div class="flex gap-3 md:flex-row">
    <WlPomodoroClock @interval="listeners.interval" @play="listeners.play" @notification="listeners.notification" />
    <WlPomodoroOverview
      :date="date"
      :records="records.value"
      @update:date="listeners.date"
      @create="listeners.add"
      @update="listeners.update"
      @remove="listeners.remove"
    />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import { onMounted, ref } from 'vue';

import { useRouter } from '#app';
import WlDateInput from '~~/layers/experiments/components/forms-input/input/WlDateInput.vue';
import WlPomodoroClock from '~~/layers/pomodoro/components/WlPomodoroClock.vue';
import WlPomodoroOverview from '~~/layers/pomodoro/components/WlPomodoroOverview.vue';
import { useLeaveConfirmation } from '~~/layers/pomodoro/composables/useLeaveConfirmation';
import { usePomodoroNotification } from '~~/layers/pomodoro/composables/usePomodoroNotification';
import { usePomodoroRecorder } from '~~/layers/pomodoro/composables/usePomodoroRecorder';
import { usePomodoroRecords } from '~~/layers/pomodoro/composables/usePomodoroRecords';
import { usePomodoroStorage } from '~~/layers/pomodoro/composables/usePomodoroStorage';
import { usePomodoroToday } from '~~/layers/pomodoro/composables/usePomodoroToday';
import type { PomodoroInterval } from '~~/layers/pomodoro/types/client/pomodoroInterval';
import type { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';
import { useProductivityAuth } from '~~/layers/productivity/composables/useProductivityAuth';

useHead({
  title: 'Pomodoro',
});

const router = useRouter();

const auth = useProductivityAuth();
const recorder = usePomodoroRecorder();
const storage = usePomodoroStorage();
const records = usePomodoroRecords();
const notification = usePomodoroNotification();
const today = usePomodoroToday();

const leaveConfirmation = useLeaveConfirmation();

const date = ref(today.get());

onMounted(async () => {
  // The records are loaded `onMounted` not to cause hydration mismatches.
  const pomodoroRecords = await storage.loadToday();

  records.load(pomodoroRecords);
});

const listeners = {
  async interval(interval: PomodoroInterval): Promise<void> {
    const record = recorder.capture(interval.type);

    if (!record) {
      return;
    }

    if (!today.isSameDay(date.value, record.startTime)) {
      date.value = record.startTime;
      const pomodoroRecords = await storage.load(record.startTime);

      records.load(pomodoroRecords);
    }

    const newRecord = await storage.save(record);
    records.add(newRecord);

    leaveConfirmation.release();
  },
  play(): void {
    recorder.record();
    leaveConfirmation.hold();
    notification.requestPermission();
  },
  notification(type: PomodoroIntervalType): void {
    notification.notify(type);
  },
  async date(date: Date): Promise<void> {
    const pomodoroRecords = await storage.load(date);

    records.load(pomodoroRecords);
  },
  async add(record: PomodoroRecord): Promise<void> {
    const newRecord = await storage.save(record);
    records.add(newRecord);
  },
  async update(newRecord: PomodoroRecord, index: number): Promise<void> {
    records.update(newRecord, index);
    await storage.update(newRecord);
  },
  async remove(index: number): Promise<void> {
    const record = records.value[index];

    if (!record) {
      return;
    }

    records.remove(index);
    await storage.remove(record);
  },
  async logout(): Promise<void> {
    await auth.logout();
    await router.push('/applications/pomodoro/login');
  },
};
</script>
