import { describe, test, expect } from 'vitest'
import { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { Interval } from '~/components/applications/pomodoro/types/interval'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

describe('PomodoroInterval', () => {
  test('calculates endDate correctly', () => {
    // Arrange
    const pomodoroInterval = new PomodoroInterval(
      new Interval(20, 12),
      new Date('2000-01-01 10:00:00'),
      PomodoroIntervalType.work
    )

    // Act
    const endDate = pomodoroInterval.endDate

    // Assert
    expect(endDate).toStrictEqual(new Date('2000-01-01 10:20:12'))
  })
})
