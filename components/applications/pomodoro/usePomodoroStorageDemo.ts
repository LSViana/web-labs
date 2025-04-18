import { provide } from 'vue'

import type { usePomodoroStorage } from '~/components/applications/pomodoro/usePomodoroStorage'
import type { PomodoroRecord } from '~/composables/server/pomodoro/types/pomodoroRecord'

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
