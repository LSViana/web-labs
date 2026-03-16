<template>
  <div class="flex w-full items-center gap-2">
    <label for="new-task" class="sr-only">{{ isEditing ? 'Edit task' : 'New task' }}:</label>
    <WlInput
      id="new-task"
      v-model="taskText"
      type="text"
      class="flex-1"
      autocomplete="off"
      :placeholder="isEditing ? 'Edit task...' : 'New task...'"
      :disabled="store.loading.value"
      @keydown.enter="onSubmit"
      @keydown.esc="onCancel"
    />
    <WlButton
      v-if="isEditing"
      variant="secondary"
      :disabled="store.loading.value"
      @click="onCancel"
    >
      Cancel
    </WlButton>
    <WlButton
      variant="primary"
      :disabled="store.loading.value || taskText.trim() === ''"
      @click="onSubmit"
    >
      {{ isEditing ? 'Save' : 'Add' }}
    </WlButton>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlInput from '~~/layers/experiments/components/forms-input/input/WlInput.vue';

const props = defineProps<{
  store: ReturnType<typeof import('~~/layers/to-do/utils/store').useTaskStore>;
}>();

const taskText = ref('');

const isEditing = computed(() => props.store.editingTask.value !== null);

// Watch for editing mode changes
watch(() => props.store.editingTask.value, (editingTask) => {
  if (editingTask) {
    taskText.value = editingTask.text;
  }
  else {
    taskText.value = '';
  }
});

async function onSubmit() {
  if (taskText.value.trim() === '') {
    return;
  }

  if (isEditing.value) {
    await props.store.saveEditing(taskText.value);
  }
  else {
    await props.store.add(taskText.value);
  }

  taskText.value = '';
}

function onCancel() {
  props.store.cancelEditing();
  taskText.value = '';
}
</script>
