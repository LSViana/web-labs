<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h2 class="text-2xl">
        To Do
      </h2>
      <div class="w-full rounded border p-3">
        <ToDoTaskForm :store="taskStore" />
      </div>
      <ToDoTaskList :store="taskStore" />
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useAsyncData } from '#app';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import ToDoTaskForm from '~~/layers/to-do/components/ToDoTaskForm.vue';
import ToDoTaskList from '~~/layers/to-do/components/ToDoTaskList.vue';
import { useTaskStore } from '~~/layers/to-do/utils/store';

const taskStore = useTaskStore();

const result = await useAsyncData('todos', () => $fetch('/api/todos'));

taskStore.items.value = result.data.value;
</script>
