<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h2 class="text-2xl">
        To Do
      </h2>
      <ToDoTaskForm />
      <ToDoTaskList />
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import { provideTaskStore } from '~/pages/applications/to-do/store'
import ToDoTaskForm from '~/pages/applications/to-do/ToDoTaskForm.vue'
import ToDoTaskList from '~/pages/applications/to-do/ToDoTaskList.vue'

provideTaskStore()
</script>
