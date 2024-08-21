<template>
  <div class="flex grow flex-col gap-5 rounded border p-5">
    <div class="flex flex-wrap justify-between gap-4 md:justify-start">
      <div class="flex flex-col">
        <span class="text-muted dark:text-muted-dark">Work</span>
        <p class="text-4xl font-bold">{{ computedRecords.work }}</p>
      </div>
      <div class="flex flex-col">
        <span class="text-muted dark:text-muted-dark">Break</span>
        <p class="text-4xl font-bold">{{ computedRecords.break }}</p>
      </div>
      <div class="flex grow items-end gap-3 sm:grow-0">
        <div class="flex grow flex-col">
          <span class="text-muted dark:text-muted-dark">Date</span>
          <WlDateInput v-model="date" @update:model-value="listeners.date"/>
        </div>
        <WlButton variant="secondary" @click="listeners.today">Today</WlButton>
      </div>
    </div>
    <WlPomodoroOverviewTimeline v-if="records.length > 0" :records="records" @select="listeners.select"/>
    <WlPomodoroRecordDetails
        v-if="record"
        v-model:record="record"
        @update:record="listeners.record"
        @close="listeners.close"
    />
    <div v-else class="flex flex-col gap-3 sm:flex-row">
      <WlButton variant="secondary" @click="listeners.addWork">Add Work</WlButton>
      <WlButton variant="secondary" @click="listeners.addBreak">Add Break</WlButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { Interval } from '~/components/applications/pomodoro/types/interval'
import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import WlPomodoroOverviewTimeline from '~/components/applications/pomodoro/WlPomodoroOverviewTimeline.vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import { useToday } from '~/components/applications/pomodoro/useToday'
import WlPomodoroRecordDetails from '~/components/applications/pomodoro/WlPomodoroRecordDetails.vue'
import WlDateInput from '~/components/experiments/forms-input/input/WlDateInput.vue'
import { useNow } from '~/components/applications/pomodoro/useNow'

const records = defineModel<PomodoroRecord[]>('records', { required: true })
const date = defineModel<Date>('date', { required: true })
const record = ref<PomodoroRecord>()
const recordIndex = ref<number>(-1)

const today = useToday()
const now = useNow()

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
const isCreating = computed(() => record.value && recordIndex.value === -1)

function getEndDateOfPrevious(): Date {
  if (records.value.length === 0) {
    // If there are no records, the end date of the previous interval is the current date.
    return now.get()
  }

  const previousRecord = records.value[records.value.length - 1]

  return previousRecord.endDate
}

const listeners = {
  date(): void {
    console.log('new date')
    record.value = undefined
    recordIndex.value = -1
  },
  today(): void {
    date.value = today.get()
    record.value = undefined
  },
  select(index: number): void {
    recordIndex.value = index
    record.value = records.value[index]
  },
  record(newRecord: PomodoroRecord): void {
    if (isCreating.value) {
      let index = -1

      if (records.value.length === 0) {
        // If there are no records, add it to the end.
        index = records.value.length - 1
      } else {
        // Otherwise, add it before the next record.
        const nextRecordIndex = records.value.findIndex(x => x.startDate > newRecord.endDate)

        if (nextRecordIndex !== -1) {
          // If there is a next record, add the new record before it.
          index = nextRecordIndex
        } else {
          // If there is no next record, add it to the end.
          index = records.value.length - 1
        }
      }

      console.log('INDEX', index)

      records.value.splice(index, 0, newRecord)
      recordIndex.value = index
    }

    const newRecords: PomodoroRecord[] = []

    newRecords.push(...records.value.slice(0, recordIndex.value))
    newRecords.push(newRecord)
    newRecords.push(...records.value.slice(recordIndex.value + 1))
    records.value = newRecords
  },
  close(): void {
    record.value = undefined
    recordIndex.value = -1
  },
  addWork(): void {
    record.value = new PomodoroRecord(getEndDateOfPrevious(), now.get(), PomodoroIntervalType.work)
  },
  addBreak(): void {
    record.value = new PomodoroRecord(getEndDateOfPrevious(), now.get(), PomodoroIntervalType.break)
  }
}
</script>
