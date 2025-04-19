<template>
  <ul>
    <li v-for="(task, index) in taskStore.items" :key="task.text">
      <label :for="`input-${index}`" class="flex gap-2 py-1">
        <input
          :id="`input-${index}`"
          type="checkbox"
          :checked="task.done"
          @change="task.done = !task.done"
        >
        <span>{{ task.text }}</span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { injectTaskStore } from '~~/layers/to-do/utils/store';

const taskStore = injectTaskStore();
</script>
