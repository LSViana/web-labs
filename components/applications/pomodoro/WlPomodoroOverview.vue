<template>
  <div class="flex grow flex-col gap-5 rounded border p-5">
    <div class="flex flex-wrap justify-between gap-4 md:justify-start">
      <div class="flex flex-col">
        <WlLabel>Work</WlLabel>
        <p class="text-4xl font-bold">{{ computedRecords.work }}</p>
      </div>
      <div class="flex flex-col">
        <WlLabel>Break</WlLabel>
        <p class="text-4xl font-bold">{{ computedRecords.break }}</p>
      </div>
      <div class="flex grow items-end gap-3 sm:grow-0">
        <div class="flex grow flex-col">
          <WlLabel for="pomodoro-overview-date">Date</WlLabel>
          <WlDateInput id="pomodoro-overview-date" v-model="date" @update:model-value="listeners.date"/>
        </div>
        <WlButton variant="secondary" title="Select today (T)" @click="listeners.today">
          <span class="underline">T</span>oday
        </WlButton>
      </div>
    </div>
    <WlPomodoroOverviewTimeline :records="records" @select="listeners.select"/>
    <template v-if="record">
      <WlPomodoroRecordDetails
          v-model:record="record"
          :new="isCreating"
          @update:record="listeners.record"
          @close="listeners.close"
          @delete="listeners.delete"
      />
      <div v-if="!isCreating" class="flex items-center gap-3">
        <a href="#" class="underline" @click="listeners.previous">Previous</a>
        <span class="w-16 text-center">{{ recordIndex + 1 }} of {{ records.length }}</span>
        <a href="#" class="underline" @click="listeners.next">Next</a>
      </div>
    </template>
    <div v-else class="flex flex-col gap-3 sm:flex-row">
      <WlButton variant="secondary" title="Add work record (W)" @click="listeners.addWork">
        <span>Add <span class="underline">W</span>ork</span>
      </WlButton>
      <WlButton variant="secondary" title="Add break record (W)" @click="listeners.addBreak">
        <span>Add <span class="underline">B</span>reak</span>
      </WlButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'
import { computed, ref } from 'vue'

import { Interval } from '~/components/applications/pomodoro/types/interval'
import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { usePomodoroNow } from '~/components/applications/pomodoro/usePomodoroNow'
import { usePomodoroToday } from '~/components/applications/pomodoro/usePomodoroToday'
import WlPomodoroOverviewTimeline from '~/components/applications/pomodoro/WlPomodoroOverviewTimeline.vue'
import WlPomodoroRecordDetails from '~/components/applications/pomodoro/WlPomodoroRecordDetails.vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlDateInput from '~/components/experiments/forms-input/input/WlDateInput.vue'
import WlLabel from '~/components/experiments/forms-input/WlLabel.vue'

type Emits = {
  (e: 'create', record: PomodoroRecord): void;
  (e: 'update', record: PomodoroRecord, index: number): void;
  (e: 'remove', index: number): void;
}

const emits = defineEmits<Emits>()

const records = defineModel<PomodoroRecord[]>('records', { required: true })
const date = defineModel<Date>('date', { required: true })
const recordIndex = ref<number>(-1)
const record = ref<PomodoroRecord>()

const today = usePomodoroToday()
const now = usePomodoroNow()

const computedRecords = computed(() => {
  const workSeconds = records.value
      .filter(x => x.type === PomodoroIntervalType.work)
      .reduce((acc, value) => acc + value.elapsedInterval.totalSeconds, 0)
  const breakSeconds = records.value
      .filter(x => x.type === PomodoroIntervalType.break)
      .reduce((acc, value) => acc + value.elapsedInterval.totalSeconds, 0)

  const result: Record<PomodoroIntervalType, Interval> = {
    work: new Interval(0, 0, workSeconds),
    break: new Interval(0, 0, breakSeconds),
  }

  return result
})
const isCreating = computed(() => Boolean(record.value && recordIndex.value === -1))

onKeyDown('w', () => recordIndex.value === -1 ? listeners.addWork() : undefined)
onKeyDown('b', () => recordIndex.value === -1 ? listeners.addBreak() : undefined)
onKeyDown('t', () => listeners.today())

const methods = {
  getEndDateOfPrevious(): Date {
    if (records.value.length === 0) {
      // If there are no records, the end date of the previous interval is the current date.
      return now.get()
    }

    const previousRecord = records.value[records.value.length - 1]

    return previousRecord.endDate
  }
}

const listeners = {
  record(newRecord: PomodoroRecord): void {
    if (isCreating.value) {
      emits('create', newRecord)
    } else {
      emits('update', newRecord, recordIndex.value)
    }
  },
  delete(): void {
    emits('remove', recordIndex.value)

    listeners.close()
  },
  date(): void {
    listeners.close()
  },
  today(): void {
    date.value = today.get()
    recordIndex.value = -1
    record.value = undefined
  },
  select(index: number): void {
    recordIndex.value = index
    record.value = records.value[recordIndex.value]
  },
  close(): void {
    recordIndex.value = -1
    record.value = undefined
  },
  addWork(): void {
    record.value = new PomodoroRecord(methods.getEndDateOfPrevious(), now.get(), PomodoroIntervalType.work)
  },
  addBreak(): void {
    record.value = new PomodoroRecord(methods.getEndDateOfPrevious(), now.get(), PomodoroIntervalType.break)
  },
  previous(): void {
    if (recordIndex.value > 0) {
      listeners.select(recordIndex.value - 1)
    }
  },
  next(): void {
    if (recordIndex.value < records.value.length - 1) {
      listeners.select(recordIndex.value + 1)
    }
  }
}
</script>
