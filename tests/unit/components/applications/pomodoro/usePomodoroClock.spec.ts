import { describe, expect, test, vi } from 'vitest'

import { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroIntervalEvent } from '~/components/applications/pomodoro/types/pomodoroEvents'
import { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { usePomodoroClock } from '~/components/applications/pomodoro/usePomodoroClock'

describe('usePomodoro', () => {
  test('starts with timer paused, set to 0 min, 25 min duration, and in work type', () => {
    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    const isRunning = pomodoro.isRunning.value
    const pomodoroInterval = pomodoro.interval.value

    // Assert
    expect(isRunning).toBe(false)
    expect(pomodoroInterval).toStrictEqual(new PomodoroInterval(
      new Interval(0, 0, 0),
      new Interval(0, 25, 0),
      PomodoroIntervalType.work,
    ))
    expect(pomodoroInterval.remainingInterval).toStrictEqual(new Interval(0, 25, 0))
  })

  test('break interval is 5 min', () => {
    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    pomodoro.skip()
    const interval = pomodoro.interval.value

    // Assert
    expect(interval.remainingInterval).toStrictEqual(new Interval(0, 5, 0))
  })

  test('timer only starts counting after started', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    vi.advanceTimersByTime(1_000)
    pomodoro.start()
    vi.advanceTimersByTime(1_000)
    const value = pomodoro.interval.value.remainingInterval

    // Assert
    expect(value).toStrictEqual(new Interval(0, 24, 59))

    // Clean-up
    vi.useRealTimers()
  })

  test('changes the interval time every 1000 ms', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(1_000)
    let value = pomodoro.interval.value

    // Assert
    expect(value.remainingInterval).toStrictEqual(new Interval(0, 24, 59))
    expect(value.remainingProgress).toBe(0.999)

    // Act
    vi.advanceTimersByTime(2_999)
    value = pomodoro.interval.value

    // Assert
    expect(value.remainingInterval).toStrictEqual(new Interval(0, 24, 57))
    expect(value.remainingProgress).toBe(0.998)

    // Act
    vi.advanceTimersByTime(1)
    value = pomodoro.interval.value

    // Assert
    expect(value.remainingInterval).toStrictEqual(new Interval(0, 24, 56))
    expect(value.remainingProgress).toBe(0.997)

    // Clean-up
    vi.useRealTimers()
  })

  test('pausing and resuming the timer works correctly', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(37 * 1_000)
    pomodoro.pause()
    vi.advanceTimersByTime(10 * 1_000)
    pomodoro.resume()
    vi.advanceTimersByTime(1_000)
    const value = pomodoro.interval.value

    // Assert
    expect(value.remainingInterval).toStrictEqual(new Interval(0, 24, 22))
    expect(value.remainingProgress).toBe(0.974)

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer pauses and resets the remaining time', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(37 * 1_000)
    pomodoro.skip()
    vi.advanceTimersByTime(10 * 1_000)
    const value = pomodoro.interval.value.remainingInterval

    // Assert
    expect(value).toStrictEqual(new Interval(0, 5, 0))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer returns the details of the elapsed interval', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(25 * 1_000)

    const pomodoroInterval = pomodoro.skip()

    // Assert
    expect(pomodoroInterval).toStrictEqual(new PomodoroInterval(
      new Interval(0, 0, 25),
      new Interval(0, 25, 0),
      PomodoroIntervalType.work
    ))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer after a period paused resets timer to 5 min', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    vi.advanceTimersByTime(25 * 1_000)
    pomodoro.skip()

    // Assert
    expect(pomodoro.interval.value.remainingInterval).toStrictEqual(new Interval(0, 5, 0))

    // Clean-up
    vi.useRealTimers()
  })

  test('skipping the timer resets it and changes type', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(25 * 1_000)
    pomodoro.skip()

    const interval = pomodoro.interval.value
    const remainingTime = interval.remainingInterval

    // Assert
    expect(interval).toStrictEqual(new PomodoroInterval(
      new Interval(0, 0, 0),
      new Interval(0, 5, 0),
      PomodoroIntervalType.break
    ))
    expect(remainingTime).toStrictEqual(new Interval(0, 5, 0))

    // Clean-up
    vi.useRealTimers()
  })

  test('when the timer pauses or ends, the `interval` event is triggered', () => {
    // Set-up
    vi.useFakeTimers()

    // Arrange
    const pomodoro = usePomodoroClock()
    const eventHandler = vi.fn()
    pomodoro.on('interval', eventHandler)

    // Act
    pomodoro.start()
    vi.advanceTimersByTime(25 * 60 * 1_000 - 1_000)

    // Assert
    expect(eventHandler).not.toHaveBeenCalled()

    // Act
    pomodoro.pause()
    const parameters = eventHandler.mock.lastCall as [PomodoroIntervalEvent]
    const interval = parameters[0].interval

    // Assert
    expect(eventHandler).toHaveBeenCalledTimes(1)
    expect(parameters).toHaveLength(1)
    expect(interval).toStrictEqual(new PomodoroInterval(
      new Interval(0, 24, 59),
      new Interval(0, 25, 0),
      PomodoroIntervalType.work
    ))

    // Act
    pomodoro.resume()
    vi.advanceTimersByTime(25 * 60 * 1_000 * 2)

    // Assert
    expect(eventHandler).toHaveBeenCalledTimes(1)

    // Clean-up
    vi.useRealTimers()
  })
})
