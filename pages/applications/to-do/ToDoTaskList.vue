<template>
  <ul>
    <li v-for="task in taskStore.items" :key="task.text">
      <input type="checkbox" :checked="task.done" @change="task.done = !task.done">
      <span>{{ task.text }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { injectTaskStore } from '~/pages/applications/to-do/store'

const taskStore = injectTaskStore()
</script>
