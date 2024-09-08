<template>
  <li
      class="flex cursor-pointer border-x border-t first:rounded-t last:rounded-b last:border-b"
      @click="listeners.click"
  >
    <span class="w-40 border-r p-3">{{ props.item.ticket }}</span>
    <span class="grow basis-0 whitespace-pre-wrap border-r p-3">{{ props.item.content }}</span>
    <span class="w-32 border-r p-3 text-center">{{ formattedDates.start }} - {{ formattedDates.end }}</span>
    <span class="w-24 p-3">{{ duration }}</span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useWorklogDurationFormat } from '~/composables/server/worklog-tracker/useWorklogDurationFormat'

type Props = {
  item: WorklogItem
}

type Emits = {
  (e: 'click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formattedDates = computed(() => ({
  start: props.item.startTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  }),
  end: props.item.endTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}))
const duration = useWorklogDurationFormat(props.item.durationSeconds)

const listeners = {
  click(): void {
    emit('click')
  }
}
</script>
