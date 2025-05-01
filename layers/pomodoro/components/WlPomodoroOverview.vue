<template>
  <div class="flex grow flex-col gap-3">
    <div class="flex grow flex-col gap-5 rounded border p-5">
      <div class="flex flex-wrap justify-between gap-4 md:justify-start">
        <div class="flex flex-col">
          <WlLabel>Work</WlLabel>
          <p class="text-4xl font-bold">
            {{ computedRecords.work }}
          </p>
        </div>
        <div class="flex flex-col">
          <WlLabel>Break</WlLabel>
          <p class="text-4xl font-bold">
            {{ computedRecords.break }}
          </p>
        </div>
      </div>
      <WlPomodoroOverviewTimeline :records="records" @select="listeners.select" />
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
    <WlPomodoroRecordConflict :records="records" @select="listeners.select" />
  </div>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core';
import { computed, ref } from 'vue';

import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlLabel from '~~/layers/experiments/components/forms-input/WlLabel.vue';
import WlPomodoroOverviewTimeline from '~~/layers/pomodoro/components/WlPomodoroOverviewTimeline.vue';
import WlPomodoroRecordConflict from '~~/layers/pomodoro/components/WlPomodoroRecordConflict.vue';
import WlPomodoroRecordDetails from '~~/layers/pomodoro/components/WlPomodoroRecordDetails.vue';
import { usePomodoroNow } from '~~/layers/pomodoro/composables/usePomodoroNow';
import { Interval } from '~~/layers/pomodoro/types/client/interval';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

type Emits = {
  (e: 'create', record: PomodoroRecord): void
  (e: 'update', record: PomodoroRecord, index: number): void
  (e: 'remove', index: number): void
};
type Props = {
  records: PomodoroRecord[]
  date: Date
};

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const recordIndex = ref<number>(-1);
const record = ref<PomodoroRecord>();

const now = usePomodoroNow();

const computedRecords = computed(() => {
  const workSeconds = props.records
    .filter(x => x.type === PomodoroIntervalType.work)
    .reduce((acc, value) => acc + value.elapsedInterval.totalSeconds, 0);

  const breakSeconds = props.records
    .filter(x => x.type === PomodoroIntervalType.break)
    .reduce((acc, value) => acc + value.elapsedInterval.totalSeconds, 0);

  const result: Record<PomodoroIntervalType, Interval> = {
    work: new Interval(0, 0, workSeconds),
    break: new Interval(0, 0, breakSeconds),
  };

  return result;
});
const isCreating = computed(() => Boolean(record.value && recordIndex.value === -1));

onKeyDown('w', () => recordIndex.value === -1 ? listeners.addWork() : undefined);
onKeyDown('b', () => recordIndex.value === -1 ? listeners.addBreak() : undefined);

const methods = {
  getEndDateOfPrevious(): Date {
    if (props.records.length === 0) {
      // If there are no records, the end date of the previous interval is the current date.
      return now.get();
    }

    const previousRecord = props.records[props.records.length - 1];

    if (!previousRecord || previousRecord.endTime > now.get()) {
      // If the previous record is in the future, use the current date.
      return now.get();
    }

    return previousRecord.endTime;
  },
};

const listeners = {
  record(newRecord: PomodoroRecord): void {
    if (isCreating.value) {
      emits('create', newRecord);
    }
    else {
      emits('update', newRecord, recordIndex.value);
    }
  },
  delete(): void {
    emits('remove', recordIndex.value);

    listeners.close();
  },
  date(): void {
    listeners.close();
  },
  select(index: number): void {
    recordIndex.value = index;
    record.value = props.records[recordIndex.value];
  },
  close(): void {
    recordIndex.value = -1;
    record.value = undefined;
  },
  addWork(): void {
    record.value = new PomodoroRecord(undefined, methods.getEndDateOfPrevious(), now.get(), PomodoroIntervalType.work);
  },
  addBreak(): void {
    record.value = new PomodoroRecord(undefined, methods.getEndDateOfPrevious(), now.get(), PomodoroIntervalType.break);
  },
  previous(): void {
    if (recordIndex.value > 0) {
      listeners.select(recordIndex.value - 1);
    }
  },
  next(): void {
    if (recordIndex.value < props.records.length - 1) {
      listeners.select(recordIndex.value + 1);
    }
  },
};
</script>
