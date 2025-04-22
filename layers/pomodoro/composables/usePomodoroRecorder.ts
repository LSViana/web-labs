import { usePomodoroNow } from '~~/layers/pomodoro/composables/usePomodoroNow';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

export function usePomodoroRecorder() {
  const now = usePomodoroNow();

  let isRecording = false;
  let startDate = now.get();

  function record() {
    isRecording = true;
    startDate = now.get();
  }

  function capture(type: PomodoroIntervalType): PomodoroRecord | undefined {
    if (!isRecording) {
      return;
    }

    isRecording = false;

    const endDate = now.get();

    return new PomodoroRecord(0, startDate, endDate, type);
  }

  return {
    record,
    capture,
  };
}
