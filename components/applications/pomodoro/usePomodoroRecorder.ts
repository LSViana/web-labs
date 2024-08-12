import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { ref } from 'vue'
import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'

export function usePomodoroRecorder() {
  let isRecording = false
  let startDate = new Date()

  const records = ref<PomodoroRecord[]>([])

  function record() {
    isRecording = true
    startDate = new Date()
  }

  function save(pomodoroInterval: PomodoroInterval) {
    if (!isRecording) {
      return
    }

    isRecording = false

    const endDate = new Date()

    records.value.push(new PomodoroRecord(
      startDate,
      endDate,
      pomodoroInterval.type
    ))
  }

  return {
    record,
    save,
    records
  }
}
