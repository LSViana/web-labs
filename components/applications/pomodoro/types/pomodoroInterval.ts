import { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export class PomodoroInterval {
  public readonly currentDate: Date
  public readonly startDate: Date
  public readonly endDate: Date
  public readonly type: PomodoroIntervalType

  constructor(currentDate: Date, startDate: Date, endDate: Date, type: PomodoroIntervalType) {
    this.currentDate = currentDate
    this.startDate = startDate
    this.endDate = endDate
    this.type = type
  }

  get remainingInterval(): Interval {
    return Interval.fromDates(this.currentDate, this.endDate)
  }
}
