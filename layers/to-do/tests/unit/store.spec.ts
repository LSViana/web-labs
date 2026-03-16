import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import type { Task } from '~~/layers/to-do/utils/store';
import { useTaskStore } from '~~/layers/to-do/utils/store';

// Mock $fetch
const mockFetch = vi.fn();
global.$fetch = mockFetch as typeof $fetch;

describe('useTaskStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('initializes with empty items', () => {
    const store = useTaskStore();

    expect(store.items.value).toHaveLength(0);
    expect(store.loading.value).toBe(false);
    expect(store.editingTask.value).toBeNull();
  });

  test('loads tasks from server', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        text: 'Task 1',
        done: false,
        created_at: '2026-03-16T00:00:00Z',
        updated_at: '2026-03-16T00:00:00Z',
      },
      {
        id: '2',
        text: 'Task 2',
        done: true,
        created_at: '2026-03-16T01:00:00Z',
        updated_at: '2026-03-16T01:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce(mockTasks);

    const store = useTaskStore();
    await store.load();

    expect(mockFetch).toHaveBeenCalledWith('/api/todos');
    expect(store.items.value).toEqual(mockTasks);
  });

  test('adds a new task', async () => {
    const newTask: Task = {
      id: '3',
      text: 'New Task',
      done: false,
      created_at: '2026-03-16T02:00:00Z',
      updated_at: '2026-03-16T02:00:00Z',
    };

    mockFetch.mockResolvedValueOnce(newTask);

    const store = useTaskStore();
    await store.add('New Task');

    expect(mockFetch).toHaveBeenCalledWith('/api/todos', {
      method: 'POST',
      body: { text: 'New Task' },
    });
    expect(store.items.value).toHaveLength(1);
    expect(store.items.value[0]).toEqual(newTask);
  });

  test('updates a task', async () => {
    const existingTask: Task = {
      id: '1',
      text: 'Task 1',
      done: false,
      created_at: '2026-03-16T00:00:00Z',
      updated_at: '2026-03-16T00:00:00Z',
    };

    const updatedTask: Task = {
      ...existingTask,
      text: 'Updated Task',
      updated_at: '2026-03-16T03:00:00Z',
    };

    mockFetch.mockResolvedValueOnce([existingTask]);
    mockFetch.mockResolvedValueOnce(updatedTask);

    const store = useTaskStore();
    await store.load();
    await store.update('1', { text: 'Updated Task' });

    expect(mockFetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'PUT',
      body: { text: 'Updated Task' },
    });
    expect(store.items.value[0].text).toBe('Updated Task');
  });

  test('toggles task done status', async () => {
    const existingTask: Task = {
      id: '1',
      text: 'Task 1',
      done: false,
      created_at: '2026-03-16T00:00:00Z',
      updated_at: '2026-03-16T00:00:00Z',
    };

    const toggledTask: Task = {
      ...existingTask,
      done: true,
      updated_at: '2026-03-16T04:00:00Z',
    };

    mockFetch.mockResolvedValueOnce([existingTask]);
    mockFetch.mockResolvedValueOnce(toggledTask);

    const store = useTaskStore();
    await store.load();
    await store.toggleDone('1');

    expect(mockFetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'PUT',
      body: { done: true },
    });
    expect(store.items.value[0].done).toBe(true);
  });

  test('removes a task', async () => {
    const existingTask: Task = {
      id: '1',
      text: 'Task 1',
      done: false,
      created_at: '2026-03-16T00:00:00Z',
      updated_at: '2026-03-16T00:00:00Z',
    };

    mockFetch.mockResolvedValueOnce([existingTask]);
    mockFetch.mockResolvedValueOnce(undefined);

    const store = useTaskStore();
    await store.load();
    await store.remove('1');

    expect(mockFetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'DELETE',
    });
    expect(store.items.value).toHaveLength(0);
  });

  test('sets and cancels editing', () => {
    const task: Task = {
      id: '1',
      text: 'Task 1',
      done: false,
      created_at: '2026-03-16T00:00:00Z',
      updated_at: '2026-03-16T00:00:00Z',
    };

    const store = useTaskStore();
    store.items.value = [task];

    store.setEditing(task);
    expect(store.editingTask.value).toEqual({ id: '1', text: 'Task 1' });

    store.cancelEditing();
    expect(store.editingTask.value).toBeNull();
  });

  test('saves editing', async () => {
    const existingTask: Task = {
      id: '1',
      text: 'Task 1',
      done: false,
      created_at: '2026-03-16T00:00:00Z',
      updated_at: '2026-03-16T00:00:00Z',
    };

    const updatedTask: Task = {
      ...existingTask,
      text: 'Edited Task',
      updated_at: '2026-03-16T05:00:00Z',
    };

    mockFetch.mockResolvedValueOnce([existingTask]);
    mockFetch.mockResolvedValueOnce(updatedTask);

    const store = useTaskStore();
    await store.load();

    store.setEditing(existingTask);
    await store.saveEditing('Edited Task');

    expect(mockFetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'PUT',
      body: { text: 'Edited Task' },
    });
    expect(store.items.value[0].text).toBe('Edited Task');
    expect(store.editingTask.value).toBeNull();
  });

  test('sorts items with pending first', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        text: 'Completed Task',
        done: true,
        created_at: '2026-03-16T00:00:00Z',
        updated_at: '2026-03-16T00:00:00Z',
      },
      {
        id: '2',
        text: 'Pending Task',
        done: false,
        created_at: '2026-03-16T01:00:00Z',
        updated_at: '2026-03-16T01:00:00Z',
      },
    ];

    const newTask: Task = {
      id: '3',
      text: 'New Pending Task',
      done: false,
      created_at: '2026-03-16T02:00:00Z',
      updated_at: '2026-03-16T02:00:00Z',
    };

    mockFetch.mockResolvedValueOnce(tasks);
    mockFetch.mockResolvedValueOnce(newTask);

    const store = useTaskStore();
    await store.load();
    await store.add('New Pending Task');

    // Verify pending tasks come first
    const pendingTasks = store.items.value.filter(t => !t.done);
    const completedTasks = store.items.value.filter(t => t.done);

    expect(pendingTasks).toHaveLength(2);
    expect(completedTasks).toHaveLength(1);
    expect(store.items.value[0].done).toBe(false);
    expect(store.items.value[1].done).toBe(false);
    expect(store.items.value[2].done).toBe(true);
  });
});
