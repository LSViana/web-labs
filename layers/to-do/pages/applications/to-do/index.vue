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
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import ToDoTaskForm from '~~/layers/to-do/components/ToDoTaskForm.vue';
import ToDoTaskList from '~~/layers/to-do/components/ToDoTaskList.vue';
import { provideTaskStore } from '~~/layers/to-do/utils/store';

provideTaskStore();
</script>
