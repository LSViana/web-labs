<template>
  <li
class="flex cursor-pointer border-x border-t first:rounded-t last:rounded-b last:border-b"
      @click="listeners.click"
  >
    <span class="border-r p-3">{{ props.item.ticket }}</span>
    <span class="grow whitespace-pre-wrap border-r p-3">{{ props.item.content }}</span>
    <span class="border-r p-3">{{ formattedDates.start }} - {{ formattedDates.end }}</span>
    <span class="p-3">{{ duration }}</span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useWorklogDuration } from '~/composables/server/worklog-tracker/useWorklogDuration'

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
    hour: '2-digit',
    minute: '2-digit'
  }),
  end: props.item.endTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}))
const duration = useWorklogDuration(() => [props.item.startTime, props.item.endTime])

const listeners = {
  click(): void {
    emit('click')
  }
}
</script>
