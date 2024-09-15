<template>
  <div>
    <label for="new-task">New task:</label>
    <input id="new-task" v-model="newTask" type="text" placeholder="New task..." @keydown.enter="onAddTask">
    <button @click="onAddTask">Add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { injectTaskStore } from '~/pages/applications/to-do/store'

const taskStore = injectTaskStore()

const newTask = ref('')

function onAddTask () {
  taskStore.add(newTask.value)
  newTask.value = ''
}
</script>
