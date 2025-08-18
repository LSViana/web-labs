import { provide } from 'vue';

import type { usePomodoroStorage } from '~~/layers/pomodoro/composables/usePomodoroStorage';
import type { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import { PomodoroRecord as PomodoroRecordClass } from '~~/layers/pomodoro/types/client/pomodoroRecord';

// Generate a demo ID counter
let demoIdCounter = 1;

function buildPomodoroStorage(): ReturnType<typeof usePomodoroStorage> {
  return {
    load: async (_date: Date) => [],
    save: async (record: PomodoroRecord) => {
      // Return optimistic and promise for demo storage
      const optimistic = new PomodoroRecordClass(
        -demoIdCounter, // negative ID for demo
        record.startTime,
        record.endTime,
        record.type,
      );

      const promise = Promise.resolve(new PomodoroRecordClass(
        demoIdCounter++, // positive ID for "server" response
        record.startTime,
        record.endTime,
        record.type,
      ));

      return { optimisticValue: optimistic, confirmedValue: promise };
    },
    update: async (_record: PomodoroRecord) => { },
    remove: async (_record: PomodoroRecord) => { },
    loadToday: async () => [],
  };
}

export function providePomodoroStorageDemo() {
  provide('pomodoroStorage', buildPomodoroStorage());
}
