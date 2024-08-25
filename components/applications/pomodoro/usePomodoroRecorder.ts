import { ref } from 'vue'

import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { useNow } from '~/components/applications/pomodoro/useNow'

export function usePomodoroRecorder() {
  const now = useNow()
  const records = ref<PomodoroRecord[]>([])

  let isRecording = false
  let startDate = now.get()

  function record() {
    isRecording = true
    startDate = now.get()
  }

  function save(type: PomodoroIntervalType) {
    if (!isRecording) {
      return
    }

    isRecording = false

    const endDate = now.get()

    addRecord(new PomodoroRecord(
      startDate,
      endDate,
      type
    ))
  }

  function load(newRecords: PomodoroRecord[]) {
    records.value.splice(0, records.value.length, ...newRecords)
  }

  function addRecord(record: PomodoroRecord) {
    let index = -1

    if (records.value.length === 0) {
      index = 0
    } else if (records.value[0].startDate >= record.endDate) {
      index = 0
    } else {
      const nextIndex = records.value.findLastIndex(x => x.endDate <= record.startDate)

      if (nextIndex !== -1) {
        // If there is a previous record, add the new record after it.
        index = nextIndex + 1
      } else {
        // If there is no next record, add it to the end.
        index = records.value.length - 1
      }
    }

    records.value.splice(index, 0, record)
  }

  return {
    record,
    save,
    load,
    records
  }
}
