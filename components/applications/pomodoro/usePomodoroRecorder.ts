import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { usePomodoroNow } from '~/components/applications/pomodoro/usePomodoroNow'
import { PomodoroRecord } from '~/composables/server/pomodoro/types/pomodoroRecord'

export function usePomodoroRecorder() {
  const now = usePomodoroNow()

  let isRecording = false
  let startDate = now.get()

  function record() {
    isRecording = true
    startDate = now.get()
  }

  function capture(type: PomodoroIntervalType): PomodoroRecord | undefined {
    if (!isRecording) {
      return
    }

    isRecording = false

    const endDate = now.get()

    return new PomodoroRecord(0, startDate, endDate, type)
  }

  return {
    record,
    capture
  }
}
