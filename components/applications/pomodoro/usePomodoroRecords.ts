import { reactive } from 'vue'

import type { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'

export function usePomodoroRecords() {
  const value = reactive<PomodoroRecord[]>([])

  function add(record: PomodoroRecord) {
    let index = -1

    if (value.length === 0) {
      index = 0
    } else if (value[0].startDate >= record.endDate) {
      index = 0
    } else {
      const nextIndex = value.findLastIndex(x => x.endDate <= record.startDate)

      if (nextIndex !== -1) {
        // If there is a previous record, add the new record after it.
        index = nextIndex + 1
      } else {
        // If there is no next record, add it to the end.
        index = value.length - 1
      }
    }

    value.splice(index, 0, record)
  }

  function update(record: PomodoroRecord, index: number) {
    value.splice(index, 1, record)
  }

  function remove(index: number) {
    value.splice(index, 1)
  }

  function load(records: PomodoroRecord[]) {
    value.splice(0, value.length, ...records)
  }

  return {
    value,
    add,
    update,
    remove,
    load
  }
}

