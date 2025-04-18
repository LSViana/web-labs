<template>
  <div class="flex items-center gap-2">
    <label for="new-task" class="sr-only">New task:</label>
    <WlInput
id="new-task"
v-model="newTask"
type="text"
placeholder="New task..."
@keydown.enter="onAddTask"/>
    <WlButton variant="primary" @click="onAddTask">Add</WlButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlInput from '~/components/experiments/forms-input/input/WlInput.vue'
import { injectTaskStore } from '~/pages/applications/to-do/store'

const taskStore = injectTaskStore()

const newTask = ref('')

function onAddTask () {
  if (newTask.value.trim() === '') {
    return
  }

  taskStore.add(newTask.value)
  newTask.value = ''
}
</script>
