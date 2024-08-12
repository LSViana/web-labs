<template>
  <div class="relative bg-slate-900 py-1">
    <div
        v-for="item in items"
        :key="item.start" class="absolute inset-0"
        :class="item.classes"
        :style="{ left: `${item.start}%`, width: `${item.length}%` }"
        :title="item.title"
    />
    <div class="absolute left-0 top-full">
      {{ formattedDates.start }}
    </div>
    <div class="absolute right-0 top-full">
      {{ formattedDates.end }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { getPomodoroTypeColor } from '~/components/applications/pomodoro/types/pomodoroTypeColor'
import { computed } from 'vue'

type Props = {
  records: PomodoroRecord[];
};

type TimelineItem = {
  title: string;
  start: number;
  length: number;
  classes: string;
}

const props = defineProps<Props>()

const dates = computed(() => ({
  start: props.records[0].startDate,
  end: props.records[props.records.length - 1].endDate
}))
const diffMs = computed(() => dates.value.end.getTime() - dates.value.start.getTime())

const formattedDates = computed(() => ({
  start: dates.value.start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }),
  end: dates.value.end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}))

const items = computed(() => {
  return props.records.map<TimelineItem>(x => {
    return {
      title: `Start: ${x.startDate.toLocaleTimeString()}, End: ${x.endDate.toLocaleTimeString()}, Duration: ${x.elapsedInterval}`,
      start: (x.startDate.getTime() - dates.value.start.getTime()) / diffMs.value * 100,
      length: (x.endDate.getTime() - x.startDate.getTime()) / diffMs.value * 100,
      classes: getPomodoroTypeColor(x.type).background
    }
  })
})

</script>
