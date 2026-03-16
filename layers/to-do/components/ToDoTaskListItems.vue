<template>
  <ul class="space-y-1">
    <li v-for="task in tasksList" :key="task.id" :class="itemClass">
      <label :for="`input-${task.id}`" class="flex cursor-pointer items-center gap-2 py-1">
        <input
          :id="`input-${task.id}`"
          type="checkbox"
          :checked="task.done"
          :disabled="loading"
          @change="toggleDone(task.id)"
        >
        <span :class="completedFlag ? 'flex-1 line-through opacity-60' : 'flex-1'">{{ task.text }}</span>
        <div class="flex items-center gap-1">
          <a
            href="#"
            role="button"
            title="Edit"
            aria-label="Edit task"
            :class="{ 'pointer-events-none opacity-50': loading }"
            class="flex size-8 items-center justify-center rounded"
            @click.stop.prevent="setEditing(task)"
          >
            <WlEditIcon />
          </a>
          <a
            href="#"
            role="button"
            title="Delete"
            aria-label="Delete task"
            :class="{ 'pointer-events-none text-danger-700 opacity-50': loading, 'text-danger-700': !loading }"
            class="flex size-8 items-center justify-center rounded"
            @click.stop.prevent="removeTask(task.id)"
          >
            <WlTrashAnimatedIcon :progress="0" />
          </a>
        </div>
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, toRef } from 'vue';

import WlTrashAnimatedIcon from '~~/layers/base/components/icons/animated/WlTrashAnimatedIcon.vue';
import WlEditIcon from '~~/layers/base/components/icons/static/WlEditIcon.vue';
import type { Task, useTaskStore } from '~~/layers/to-do/utils/store';

const props = defineProps<{
  tasks: Task[]
  store: ReturnType<typeof useTaskStore>
  completed?: boolean
  itemClass?: string
}>();

// Preserve reactivity when parent passes refs/computeds
const tasksRef = toRef(props, 'tasks');
const storeRef = toRef(props, 'store');
const completedRef = toRef(props, 'completed');
const itemClass = computed(() => props.itemClass ?? '-mx-2 rounded px-2 hover:bg-slate-200 dark:hover:bg-slate-700');

// Expose local names used in template for clarity and helpers that call through to the passed store
const tasksList = computed(() => tasksRef.value ?? []);
const storeObj = computed(() => storeRef.value);
const completedFlag = computed(() => !!completedRef.value);
const loading = computed(() => !!storeObj.value?.loading?.value);

function toggleDone(id: string) {
  // call through to the passed store; the store will update its items and the parent lists are computed
  storeObj.value.toggleDone(id);
}

function setEditing(task: Task) {
  storeObj.value.setEditing(task);
}

function removeTask(id: string) {
  storeObj.value.remove(id);
}
</script>
