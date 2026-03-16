<template>
  <div class="space-y-4">
    <div v-if="pendingTasks.length > 0">
      <h3 class="mb-2 text-lg font-semibold">
        Pending
      </h3>
      <ul class="space-y-1">
        <li v-for="task in pendingTasks" :key="task.id">
          <label :for="`input-${task.id}`" class="flex items-center gap-2 py-1">
            <input
              :id="`input-${task.id}`"
              type="checkbox"
              :checked="task.done"
              :disabled="store.loading.value"
              @change="store.toggleDone(task.id)"
            >
            <span class="flex-1">{{ task.text }}</span>
            <WlButton
              variant="secondary"
              :disabled="store.loading.value"
              @click="store.setEditing(task)"
            >
              Edit
            </WlButton>
            <WlButton
              variant="danger"
              :disabled="store.loading.value"
              @click="store.remove(task.id)"
            >
              Delete
            </WlButton>
          </label>
        </li>
      </ul>
    </div>

    <div v-if="completedTasks.length > 0">
      <h3 class="mb-2 text-lg font-semibold">
        Completed
      </h3>
      <ul class="space-y-1">
        <li v-for="task in completedTasks" :key="task.id">
          <label :for="`input-${task.id}`" class="flex items-center gap-2 py-1">
            <input
              :id="`input-${task.id}`"
              type="checkbox"
              :checked="task.done"
              :disabled="store.loading.value"
              @change="store.toggleDone(task.id)"
            >
            <span class="flex-1 line-through opacity-60">{{ task.text }}</span>
            <WlButton
              variant="secondary"
              :disabled="store.loading.value"
              @click="store.setEditing(task)"
            >
              Edit
            </WlButton>
            <WlButton
              variant="danger"
              :disabled="store.loading.value"
              @click="store.remove(task.id)"
            >
              Delete
            </WlButton>
          </label>
        </li>
      </ul>
    </div>

    <div v-if="pendingTasks.length === 0 && completedTasks.length === 0" class="text-center text-gray-500 py-8">
      No tasks yet. Add one above!
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import type { Task } from '~~/layers/to-do/utils/store';

const props = defineProps<{
  store: ReturnType<typeof import('~~/layers/to-do/utils/store').useTaskStore>;
}>();

const pendingTasks = computed(() => props.store.items.value.filter((task: Task) => !task.done));
const completedTasks = computed(() => props.store.items.value.filter((task: Task) => task.done));
</script>
