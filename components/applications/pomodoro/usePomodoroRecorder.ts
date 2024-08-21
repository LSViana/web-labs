import { ref } from 'vue'

import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
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

  function save(pomodoroInterval: PomodoroInterval) {
    if (!isRecording) {
      return
    }

    isRecording = false

    const endDate = now.get()

    records.value.push(new PomodoroRecord(
      startDate,
      endDate,
      pomodoroInterval.type
    ))
  }

  function load(newRecords: PomodoroRecord[]) {
    records.value.splice(0, records.value.length, ...newRecords)
  }

  return {
    record,
    save,
    load,
    records
  }
}
