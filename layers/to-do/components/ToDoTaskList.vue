<template>
  <div class="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
    <div>
      <h3 class="mb-2 text-lg font-semibold">
        Pending
      </h3>
      <template v-if="pendingTasks.length > 0">
        <ToDoTaskListItems
          :tasks="pendingTasks"
          :store="props.store"
        />
      </template>
      <template v-else>
        <div class="text-sm text-gray-500">
          No pending tasks — add one above.
        </div>
      </template>
    </div>

    <div>
      <h3 class="mb-2 text-lg font-semibold">
        Completed
      </h3>
      <template v-if="completedTasks.length > 0">
        <ToDoTaskListItems
          :tasks="completedTasks"
          :store="props.store"
          :completed="true"
        />
      </template>
      <template v-else>
        <div class="text-sm text-gray-500">
          No completed tasks yet — finish tasks to see them here.
        </div>
      </template>
    </div>

    <!-- Section-specific empty states are shown above to keep layout stable -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { Task, useTaskStore } from '~~/layers/to-do/utils/store';

import ToDoTaskListItems from './ToDoTaskListItems.vue';

const props = defineProps<{
  store: ReturnType<typeof useTaskStore>
}>();

const pendingTasks = computed(() => props.store.items.value.filter((task: Task) => !task.done));
const completedTasks = computed(() => props.store.items.value.filter((task: Task) => task.done));
</script>
