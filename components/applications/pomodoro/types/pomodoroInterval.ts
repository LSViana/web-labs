import type { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export class PomodoroInterval {
  public readonly elapsedInterval: Interval
  public readonly totalInterval: Interval
  public readonly type: PomodoroIntervalType

  constructor(elapsedInterval: Interval, totalInterval: Interval, type: PomodoroIntervalType) {
    this.elapsedInterval = elapsedInterval
    this.totalInterval = totalInterval
    this.type = type
  }

  get remainingInterval(): Interval {
    return this.totalInterval.subtractInterval(this.elapsedInterval)
  }

  get remainingProgress(): number {
    const totalSeconds = this.totalInterval.totalSeconds
    const remainingSeconds = this.remainingInterval.totalSeconds

    return Math.floor(remainingSeconds / totalSeconds * 1000) / 1000
  }
}
