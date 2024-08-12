import { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export class PomodoroRecord {
  public readonly startDate: Date
  public readonly endDate: Date
  public readonly type: PomodoroIntervalType

  constructor(startDate: Date, endDate: Date, type: PomodoroIntervalType) {
    this.startDate = startDate
    this.endDate = endDate
    this.type = type
  }

  get elapsedInterval(): Interval {
    return Interval.fromDates(this.startDate, this.endDate)
  }
}
