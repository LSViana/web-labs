<template>
  <template v-if="props.items.length > 0">
    <p class="text-right">
      {{ totalDuration }}
    </p>
    <ul>
      <WlWorklogListItem
        v-for="(item, index) in props.items"
        :key="item.id"
        :item="item"
        :selected="props.selectedIndex === index"
        @click="listeners.click(index)"
      />
    </ul>
  </template>
  <p v-else>
    No worklogs found.
  </p>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import WlWorklogListItem from '~/components/applications/worklog-tracker/WlWorklogListItem.vue'
import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useWorklogDurationFormat } from '~/composables/server/worklog-tracker/useWorklogDurationFormat'

type Props = {
  items: WorklogItem[]
  selectedIndex: number
}

type Emits = {
  (e: 'select', index: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const totalDurationSeconds = computed(() => props.items.reduce((acc, item) => acc + item.durationSeconds, 0))
const totalDuration = useWorklogDurationFormat(totalDurationSeconds)

const listeners = {
  click(index: number): void {
    emits('select', index)
  },
}
</script>
