import { provide } from 'vue';

import type { usePomodoroStorage } from '~~/layers/pomodoro/composables/usePomodoroStorage';
import type { PomodoroRecord } from '~~/layers/pomodoro/shared/types/pomodoroRecord';

function buildPomodoroStorage(): ReturnType<typeof usePomodoroStorage> {
  return {
    load: async (_date: Date) => [],
    save: async (_record: PomodoroRecord) => _record,
    update: async (_record: PomodoroRecord) => { },
    remove: async (_record: PomodoroRecord) => { },
    loadToday: async () => [],
  };
}

export function providePomodoroStorageDemo() {
  provide('pomodoroStorage', buildPomodoroStorage());
}
