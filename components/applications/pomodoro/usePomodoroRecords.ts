import { shallowReactive } from 'vue'

import type { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'

export function usePomodoroRecords() {
  const value = shallowReactive<PomodoroRecord[]>([])

  function add(record: PomodoroRecord) {
    let index = -1

    if (value.length === 0) {
      index = 0
    } else if (value[0].startDate >= record.endDate) {
      index = 0
    } else {
      const nextIndex = value.findLastIndex(x => x.endDate <= record.startDate)

      // There will always be a next record since the first one starts before the new record.
      index = nextIndex + 1
    }

    value.splice(index, 0, record)
  }

  function update(record: PomodoroRecord, index: number) {
    remove(index)
    add(record)
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

