import { describe, expect, test, vi } from 'vitest'
import { usePomodoro } from '~/components/applications/pomodoro/usePomodoro'
import { Interval } from '~/components/applications/pomodoro/types/interval'
import { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

describe('usePomodoro', () => {
  test('starts with timer paused, set to 25 min, and in work type', () => {
    // Arrange
    const now = new Date()
    const pomodoro = usePomodoro()

    // Act
    const isRunning = pomodoro.isRunning.value
    const pomodoroInterval = pomodoro.remaining.value

    // Assert
    expect(isRunning).toBe(false)
    expect(pomodoroInterval.interval).toStrictEqual(new Interval(25, 0))
    expect(pomodoroInterval.startDate).toStrictEqual(now)
    expect(pomodoroInterval.type).toStrictEqual(PomodoroIntervalType.work)
  })

  test('timer only starts counting after started', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoro()

    // Act
    vi.advanceTimersByTime(1_000)
    pomodoro.start()
    vi.advanceTimersByTime(1_000)
    const value = pomodoro.remaining.value.interval

    // Assert
    expect(value).toStrictEqual(new Interval(24, 59))

    // Clean-up
    vi.useRealTimers()
  })

  test('changes the remaining time every 1000 ms', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoro()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(1_000)
    let value = pomodoro.remaining.value.interval

    // Assert
    expect(value).toStrictEqual(new Interval(24, 59))

    // Act
    vi.advanceTimersByTime(2_999)
    value = pomodoro.remaining.value.interval

    // Assert
    expect(value).toStrictEqual(new Interval(24, 57))

    // Act
    vi.advanceTimersByTime(1)
    value = pomodoro.remaining.value.interval

    // Assert
    expect(value).toStrictEqual(new Interval(24, 56))

    // Clean-up
    vi.useRealTimers()
  })

  test('pausing the timer holds the same time', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoro()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(37 * 1_000)
    pomodoro.pause()
    vi.advanceTimersByTime(10 * 1_000)
    const value = pomodoro.remaining.value.interval

    // Assert
    expect(value).toStrictEqual(new Interval(24, 23))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer pauses and sets it to 25 min', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoro()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(37 * 1_000)
    pomodoro.skip()
    vi.advanceTimersByTime(10 * 1_000)
    const value = pomodoro.remaining.value.interval

    // Assert
    expect(value).toStrictEqual(new Interval(25, 0))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer returns the details of the elapsed interval', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoro()

    // Act
    const startDate = new Date()
    pomodoro.start()
    vi.advanceTimersByTime(25 * 1_000)
    const pomodoroInterval = pomodoro.skip()

    // Assert
    expect(pomodoroInterval).toStrictEqual(new PomodoroInterval(
      new Interval(24, 35),
      startDate,
      PomodoroIntervalType.work
    ))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer after a period paused returns interval zero', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const now = new Date()
    const pomodoro = usePomodoro()

    // Act
    vi.advanceTimersByTime(25 * 1_000)
    const pomodoroInterval = pomodoro.skip()

    // Assert
    expect(pomodoroInterval).toStrictEqual(new PomodoroInterval(
      new Interval(0, 0),
      now,
      PomodoroIntervalType.work
    ))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer resets to 25 min and changes type', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const now = new Date()
    const pomodoro = usePomodoro()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(25 * 1_000)
    pomodoro.skip()
    const remainingInterval = pomodoro.remaining.value

    // Assert
    expect(remainingInterval).toStrictEqual(new PomodoroInterval(
      new Interval(24, 35),
      now,
      PomodoroIntervalType.break
    ))

    // Clean-up
    vi.useRealTimers()
  })

  test('when the timer ends, the finished event handlers are invoked', () => {

  })

  // TODO: Record the times. Return the details when finishing.
})
