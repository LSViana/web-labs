<template>
  <div class="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
    <div v-if="pendingTasks.length > 0">
      <h3 class="mb-2 text-lg font-semibold">
        Pending
      </h3>
      <ToDoTaskListItems
        :tasks="pendingTasks"
        :store="props.store"
      />
    </div>

    <div v-if="completedTasks.length > 0">
      <h3 class="mb-2 text-lg font-semibold">
        Completed
      </h3>
      <ToDoTaskListItems
        :tasks="completedTasks"
        :store="props.store"
        :completed="true"
      />
    </div>

    <div v-if="pendingTasks.length === 0 && completedTasks.length === 0" class="py-8 text-center text-gray-500">
      No tasks yet. Add one above!
    </div>
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
