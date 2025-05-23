import { describe, expect, test, vi } from 'vitest';

import { usePomodoroRecorder } from '~~/layers/pomodoro/composables/usePomodoroRecorder';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

describe('usePomodoroRecorder', () => {
  test('should record and capture correctly', async () => {
    // Arrange
    vi.useFakeTimers();

    const pomodoroRecorder = usePomodoroRecorder();
    const startTime = new Date(2023, 0, 1, 10, 0, 0, 25);
    const endTime = new Date(2023, 0, 1, 10, 25, 0, 499);

    vi.setSystemTime(startTime);

    // Act
    pomodoroRecorder.record();

    vi.setSystemTime(endTime);

    const result = pomodoroRecorder.capture(PomodoroIntervalType.work);

    // Assert
    expect(result).toEqual(new PomodoroRecord(
      undefined,
      new Date(2023, 0, 1, 10, 0, 0),
      new Date(2023, 0, 1, 10, 25, 0, 0),
      PomodoroIntervalType.work,
    ));

    vi.restoreAllMocks();
  });

  test('should return undefined when not recording', () => {
    // Arrange
    const pomodoroRecorder = usePomodoroRecorder();

    // Act
    const result = pomodoroRecorder.capture(PomodoroIntervalType.work);

    // Assert
    expect(result).toBeUndefined();
  });
});
