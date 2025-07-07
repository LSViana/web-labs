import { usePomodoroNow } from '~~/layers/pomodoro/composables/usePomodoroNow';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

export function usePomodoroRecorder() {
  const date = usePomodoroNow();

  let isRecording = false;
  let startDate = date.getToday();

  function record() {
    isRecording = true;
    startDate = date.getToday();
  }

  function capture(type: PomodoroIntervalType): PomodoroRecord | undefined {
    if (!isRecording) {
      return;
    }

    isRecording = false;

    const endDate = date.getToday();

    return new PomodoroRecord(undefined, startDate, endDate, type);
  }

  return {
    record,
    capture,
  };
}
