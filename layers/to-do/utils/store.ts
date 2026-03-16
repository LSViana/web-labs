import { ref } from 'vue';

export interface Task {
  id: string;
  text: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskEdit {
  id: string;
  text: string;
}

export function useTaskStore() {
  const items = ref<Task[]>([]);
  const loading = ref(false);
  const editingTask = ref<TaskEdit | null>(null);

  async function load() {
    loading.value = true;
    try {
      const response = await $fetch<Task[]>('/api/todos');
      items.value = response;
    }
    finally {
      loading.value = false;
    }
  }

  async function add(text: string) {
    loading.value = true;
    try {
      const newTask = await $fetch<Task>('/api/todos', {
        method: 'POST',
        body: { text },
      });
      items.value.push(newTask);
      // Re-sort after adding
      items.value.sort((a, b) => {
        if (a.done !== b.done) {
          return a.done ? 1 : -1;
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
    }
    finally {
      loading.value = false;
    }
  }

  async function update(id: string, updates: Partial<{ text: string; done: boolean }>) {
    loading.value = true;
    try {
      const updatedTask = await $fetch<Task>(`/api/todos/${id}`, {
        method: 'PUT',
        body: updates,
      });
      const index = items.value.findIndex(t => t.id === id);
      if (index !== -1) {
        items.value[index] = updatedTask;
        // Re-sort after updating
        items.value.sort((a, b) => {
          if (a.done !== b.done) {
            return a.done ? 1 : -1;
          }
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
      }
    }
    finally {
      loading.value = false;
    }
  }

  async function toggleDone(id: string) {
    const task = items.value.find(t => t.id === id);
    if (task) {
      await update(id, { done: !task.done });
    }
  }

  function setEditing(task: Task) {
    editingTask.value = { id: task.id, text: task.text };
  }

  function cancelEditing() {
    editingTask.value = null;
  }

  async function saveEditing(text: string) {
    if (editingTask.value) {
      await update(editingTask.value.id, { text });
      editingTask.value = null;
    }
  }

  async function remove(id: string) {
    loading.value = true;
    try {
      await $fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      items.value = items.value.filter(t => t.id !== id);
    }
    finally {
      loading.value = false;
    }
  }

  return {
    items,
    loading,
    editingTask,
    load,
    add,
    update,
    toggleDone,
    setEditing,
    cancelEditing,
    saveEditing,
    remove,
  };
}
