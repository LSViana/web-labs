<template>
  <div class="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
    <div v-if="pendingTasks.length > 0">
      <h3 class="mb-2 text-lg font-semibold">
        Pending
      </h3>
      <ul class="space-y-1">
        <li v-for="task in pendingTasks" :key="task.id" class="-mx-2 rounded px-2 hover:bg-slate-50 dark:hover:bg-slate-700">
          <label :for="`input-${task.id}`" class="flex cursor-pointer items-center gap-2 py-1">
            <input
              :id="`input-${task.id}`"
              type="checkbox"
              :checked="task.done"
              :disabled="store.loading.value"
              @change="store.toggleDone(task.id)"
            >
            <span class="flex-1">{{ task.text }}</span>
            <div class="flex items-center gap-1">
              <a
                href="#"
                role="button"
                title="Edit"
                aria-label="Edit task"
                :class="{ 'pointer-events-none opacity-50': store.loading.value }"
                class="flex size-8 items-center justify-center rounded"
                @click.stop.prevent="store.setEditing(task)"
              >
                <WlEditIcon />
              </a>
              <a
                href="#"
                role="button"
                title="Delete"
                aria-label="Delete task"
                :class="{ 'pointer-events-none text-danger-700 opacity-50': store.loading.value, 'text-danger-700': !store.loading.value }"
                class="flex size-8 items-center justify-center rounded"
                @click.stop.prevent="store.remove(task.id)"
              >
                <WlTrashAnimatedIcon :progress="0" />
              </a>
            </div>
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
          <label :for="`input-${task.id}`" class="flex cursor-pointer items-center gap-2 rounded py-1 hover:bg-slate-50 dark:hover:bg-slate-800">
            <input
              :id="`input-${task.id}`"
              type="checkbox"
              :checked="task.done"
              :disabled="store.loading.value"
              @change="store.toggleDone(task.id)"
            >
            <span class="flex-1 line-through opacity-60">{{ task.text }}</span>
            <a
              href="#"
              role="button"
              title="Edit"
              aria-label="Edit task"
              :class="{ 'pointer-events-none opacity-50': store.loading.value }"
              class="rounded p-1"
              @click.stop.prevent="store.setEditing(task)"
            >
              <WlEditIcon />
            </a>
            <a
              href="#"
              role="button"
              title="Delete"
              aria-label="Delete task"
              :class="{ 'pointer-events-none text-danger-700 opacity-50': store.loading.value, 'text-danger-700': !store.loading.value }"
              class="rounded p-1"
              @click.stop.prevent="store.remove(task.id)"
            >
              <WlTrashAnimatedIcon :progress="0" />
            </a>
          </label>
        </li>
      </ul>
    </div>

    <div v-if="pendingTasks.length === 0 && completedTasks.length === 0" class="py-8 text-center text-gray-500">
      No tasks yet. Add one above!
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import WlTrashAnimatedIcon from '~~/layers/base/components/icons/animated/WlTrashAnimatedIcon.vue';
import WlEditIcon from '~~/layers/base/components/icons/static/WlEditIcon.vue';
import type { Task, useTaskStore } from '~~/layers/to-do/utils/store';

const props = defineProps<{
  store: ReturnType<typeof useTaskStore>
}>();

const pendingTasks = computed(() => props.store.items.value.filter((task: Task) => !task.done));
const completedTasks = computed(() => props.store.items.value.filter((task: Task) => task.done));
</script>
