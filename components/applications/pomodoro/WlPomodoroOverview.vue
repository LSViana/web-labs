<template>
  <div class="flex grow flex-col gap-5 border p-5">
    <div class="flex justify-between md:justify-start md:gap-12">
      <div class="flex flex-col">
        <span class="text-muted dark:text-muted-dark">Work</span>
        <p class="text-4xl font-bold">{{ records.work }}</p>
      </div>
      <div class="flex flex-col">
        <span class="text-muted dark:text-muted-dark">Break</span>
        <p class="text-4xl font-bold">{{ records.break }}</p>
      </div>
      <div class="flex items-end gap-3">
        <div class="flex flex-col">
          <span class="text-muted dark:text-muted-dark">Date</span>
          <input
              v-model="date"
              type="date"
              class="rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-700"
          >
        </div>
        <WlButton variant="secondary" @click="listeners.today">Today</WlButton>
      </div>
    </div>
    <WlPomodoroOverviewTimeline v-if="props.records.length > 0" :records="props.records"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import WlPomodoroOverviewTimeline from '~/components/applications/pomodoro/WlPomodoroOverviewTimeline.vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import { useToday } from '~/components/applications/pomodoro/useToday'

type Props = {
  records: PomodoroRecord[];
};

const props = defineProps<Props>()
const date = defineModel<Date>('date', {
  required: true,
  set: (value: Date | string) => {
    if (value instanceof Date) {
      return value
    } else {
      return new Date(value + 'T00:00:00')
    }
  },
  get: (value) => value.toISOString().split('T')[0]
})

const today = useToday()

const records = computed(() => {
  const workSeconds = props.records
      .filter(x => x.type === PomodoroIntervalType.work)
      .reduce((acc, value) => acc + value.elapsedInterval.totalSeconds, 0)
  const breakSeconds = props.records
      .filter(x => x.type === PomodoroIntervalType.break)
      .reduce((acc, value) => acc + value.elapsedInterval.totalSeconds, 0)

  const result: Record<PomodoroIntervalType, Interval> = {
    work: new Interval(0, 0, workSeconds),
    break: new Interval(0, 0, breakSeconds),
  }

  return result
})

const listeners = {
  today(): void {
    date.value = today.get()
  }
}
</script>
