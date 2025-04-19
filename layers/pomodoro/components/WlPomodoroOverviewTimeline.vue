<template>
  <div class="pb-5">
    <div class="relative overflow-hidden bg-slate-900 py-1">
      <div
        v-for="(item, index) in items"
        :key="item.start"
        class="absolute inset-0 min-w-0.5 cursor-pointer outline-none focus-visible:ring-4"
        tabindex="0"
        :class="item.classes"
        :style="{ left: `${item.start}%`, width: `${item.length}%` }"
        :title="item.title"
        @click="listeners.select(index)"
        @keyup.enter="listeners.select(index)"
      />
      <div class="absolute left-0 top-full" title="Start time of first interval">
        {{ formattedDates.start }}
      </div>
      <div class="absolute right-0 top-full" title="End time of last interval">
        {{ formattedDates.end }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { usePomodoroToday } from '~~/layers/pomodoro/composables/usePomodoroToday';
import type { PomodoroRecord } from '~~/layers/pomodoro/shared/types/pomodoroRecord';
import { getPomodoroTypeColor } from '~~/layers/pomodoro/types/pomodoroTypeColor';

type Props = {
  records: PomodoroRecord[]
};

type Emits = {
  (e: 'select', index: number): void
};

type TimelineItem = {
  title: string
  start: number
  length: number
  classes: string
};

const today = usePomodoroToday();

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const dates = computed(() => ({
  start: props.records[0]?.startTime ?? today.get(),
  end: props.records[props.records.length - 1]?.endTime ?? today.get(),
}));
const diffMs = computed(() => dates.value.end.getTime() - dates.value.start.getTime());

const formattedDates = computed(() => ({
  start: dates.value.start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
  end: dates.value.end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
}));

const items = computed(() => {
  return props.records.map<TimelineItem>((x, index) => {
    const type = getPomodoroTypeColor(x.type);

    return {
      title: `Start: ${x.startTime.toLocaleTimeString()}, End: ${x.endTime.toLocaleTimeString()}, Duration: ${x.elapsedInterval}`,
      start: (x.startTime.getTime() - dates.value.start.getTime()) / diffMs.value * 100,
      length: (x.endTime.getTime() - x.startTime.getTime()) / diffMs.value * 100,
      classes: `${type.backgroundInteractive} ${type.borderHorizontal} ${index < props.records.length - 1 ? 'border-r' : ''}`,
    };
  });
});

const listeners = {
  select(recordIndex: number): void {
    emits('select', recordIndex);
  },
};
</script>
