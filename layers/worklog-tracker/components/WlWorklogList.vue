<template>
  <template v-if="props.items.length > 0">
    <p class="text-right">
      <template v-if="showPreview">
        {{ totalDuration }} &gt; {{ previewTotalDuration }}
      </template>
      <template v-else>
        {{ totalDuration }}
      </template>
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
import { computed } from 'vue';

import WlWorklogListItem from '~~/layers/worklog-tracker/components/WlWorklogListItem.vue';
import { useWorklogDurationFormat } from '~~/layers/worklog-tracker/composables/useWorklogDurationFormat';
import type { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';

type Props = {
  items: WorklogItem[]
  selectedIndex: number
  currentItem?: WorklogItem
  isEditing?: boolean
};

type Emits = {
  (e: 'select', index: number): void
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const totalDurationSeconds = computed(() => props.items.reduce((acc, item) => acc + item.durationSeconds, 0));
const totalDuration = useWorklogDurationFormat(totalDurationSeconds);

// Calculate preview total if currentItem is provided
const previewTotalSeconds = computed(() => {
  if (!props.currentItem) {
    return totalDurationSeconds.value;
  }

  let total = 0;

  // Add all existing worklogs except the one being edited
  for (const existingItem of props.items) {
    if (props.isEditing && existingItem.id === props.currentItem.id) {
      continue; // Skip the item being edited
    }
    total += existingItem.durationSeconds;
  }

  // Add the current worklog duration
  total += props.currentItem.durationSeconds;

  return total;
});
const previewTotalDuration = useWorklogDurationFormat(previewTotalSeconds);

// Determine if preview is different from current total
const showPreview = computed(() => {
  return props.currentItem && previewTotalSeconds.value !== totalDurationSeconds.value;
});

const listeners = {
  click(index: number): void {
    emits('select', index);
  },
};
</script>
