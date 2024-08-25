import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { useNow } from '~/components/applications/pomodoro/useNow'

export function usePomodoroRecorder() {
  const now = useNow()

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

    return new PomodoroRecord(startDate, endDate, type)
  }

  return {
    record,
    capture
  }
}
