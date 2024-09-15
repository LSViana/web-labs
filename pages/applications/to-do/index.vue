<template>
  <h2>To Do</h2>
  <ToDoTaskForm/>
  <ToDoTaskList/>
</template>

<script lang="ts" setup>
import { provideTaskStore } from '~/pages/applications/to-do/store'
import ToDoTaskForm from '~/pages/applications/to-do/ToDoTaskForm.vue'
import ToDoTaskList from '~/pages/applications/to-do/ToDoTaskList.vue'

provideTaskStore()
</script>
