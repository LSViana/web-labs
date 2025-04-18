<template>
  <div v-if="hasConflicts" class="flex items-center gap-2 rounded border border-amber-400 p-3">
    <WlTriangleExclamationIcon class="text-amber-400" />
    <span>Conflicts:</span>
    <template v-for="conflict in conflictIndexes" :key="conflict">
      <span>
        <a href="#" class="underline" @click="listeners.select(conflict)">#{{ conflict + 1 }}</a>
        and
        <a href="#" class="underline" @click="listeners.select(conflict + 1)">#{{ conflict + 2 }}</a>
      </span>
      <span v-if="conflict < conflictIndexes.length - 1"> // </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import WlTriangleExclamationIcon from '~/components/shared/icons/static/WlTriangleExclamationIcon.vue'
import type { PomodoroRecord } from '~/composables/server/pomodoro/types/pomodoroRecord'

type Emits = {
  (e: 'select', index: number): void
}

type Props = {
  records: PomodoroRecord[]
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const conflictIndexes = computed(() => {
  if (props.records.length <= 1) {
    return []
  }

  const indexes: number[] = []

  for (let i = 0; i < props.records.length - 1; i++) {
    const record = props.records[i]
    const nextRecord = props.records[i + 1]

    if (record.endTime > nextRecord.startTime && record.startTime < nextRecord.endTime) {
      indexes.push(i)
    }
  }

  return indexes
})
const hasConflicts = computed(() => conflictIndexes.value.length > 0)

const listeners = {
  select(index: number): void {
    emits('select', index)
  },
}
</script>
