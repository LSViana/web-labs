import type { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export class PomodoroInterval {
  public readonly interval: Interval
  public readonly startDate: Date
  public readonly type: PomodoroIntervalType

  constructor(interval: Interval, startDate: Date, type: PomodoroIntervalType) {
    this.interval = interval
    this.startDate = startDate
    this.type = type
  }

  public get endDate(): Date {
    const totalSeconds = this.interval.minutes * 60 + this.interval.seconds
    const totalMs = totalSeconds * 1_000

    return new Date(this.startDate.getTime() + totalMs)
  }
}
