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
    <WlPomodoroRecordDetails
        v-if="record"
        v-model:record="record"
        :new="isCreating"
        @update:record="listeners.record"
        @close="listeners.close"
        @delete="listeners.delete"
    />
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
import { useNow } from '~/components/applications/pomodoro/useNow'
import { useToday } from '~/components/applications/pomodoro/useToday'
import WlPomodoroOverviewTimeline from '~/components/applications/pomodoro/WlPomodoroOverviewTimeline.vue'
import WlPomodoroRecordDetails from '~/components/applications/pomodoro/WlPomodoroRecordDetails.vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlDateInput from '~/components/experiments/forms-input/input/WlDateInput.vue'
import WlLabel from '~/components/experiments/forms-input/WlLabel.vue'

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
const isCreating = computed(() => Boolean(record.value && recordIndex.value === -1))

onKeyDown('w', () => listeners.addWork())
onKeyDown('b', () => listeners.addBreak())
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
  date(): void {
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
      } else if (records.value[0].startDate >= newRecord.endDate) {
        // If the new record starts before the first record, add it to the beginning.
        index = 0
      } else {
        // Otherwise, add it after the previous record.
        const nextRecordIndex = records.value.findLastIndex(x => x.endDate <= newRecord.startDate)

        if (nextRecordIndex !== -1) {
          // If there is a previous record, add the new record after it.
          index = nextRecordIndex + 1
        } else {
          // If there is no next record, add it to the end.
          index = records.value.length - 1
        }
      }

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
  delete(): void {
    const newRecords = [...records.value]
    newRecords.splice(recordIndex.value, 1)
    records.value = newRecords

    listeners.close()
  },
  addWork(): void {
    record.value = new PomodoroRecord(methods.getEndDateOfPrevious(), now.get(), PomodoroIntervalType.work)
  },
  addBreak(): void {
    record.value = new PomodoroRecord(methods.getEndDateOfPrevious(), now.get(), PomodoroIntervalType.break)
  }
}
</script>
