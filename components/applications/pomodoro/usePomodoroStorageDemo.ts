import { provide } from 'vue'

import type { PomodoroRecord } from './types/pomodoroRecord'
import type { usePomodoroStorage } from './usePomodoroStorage'

function buildPomodoroStorage(): ReturnType<typeof usePomodoroStorage> {
  return {
    load: async (_date: Date) => [],
    save: async (_record: PomodoroRecord) => _record,
    update: async (_record: PomodoroRecord) => { },
    remove: async (_record: PomodoroRecord) => { },
    loadToday: async () => []
  }
}

export function providePomodoroStorageDemo() {
  provide('pomodoroStorage', buildPomodoroStorage())
}
