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

// Fetch tasks on the server when possible so the page is rendered with items
// already populated on first load. Return the fetched todos so Nuxt serializes
// them to the client and we can populate the client-side store with the
// identical array to avoid hydration mismatches.
const { data: serverTodos } = await useAsyncData('todos', async () => {
  const todos = await $fetch('/api/todos');
  return todos;
});

// Ensure the reactive store has the same items used for server rendering.
if (serverTodos && serverTodos.value) {
  taskStore.items.value = serverTodos.value;
}
</script>
