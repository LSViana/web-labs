import { usePomodoroDate } from '~~/layers/pomodoro/composables/usePomodoroDate';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

export function usePomodoroRecorder() {
  const date = usePomodoroDate();

  let isRecording = false;
  let startDate = date.getNow();

  function record() {
    isRecording = true;
    startDate = date.getNow();
  }

  function capture(type: PomodoroIntervalType): PomodoroRecord | undefined {
    if (!isRecording) {
      return;
    }

    isRecording = false;

    const endDate = date.getNow();

    return new PomodoroRecord(undefined, startDate, endDate, type);
  }

  return {
    record,
    capture,
  };
}
