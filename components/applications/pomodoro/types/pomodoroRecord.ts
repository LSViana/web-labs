import { Interval } from '~/components/applications/pomodoro/types/interval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export class PomodoroRecord {
  public readonly id: number
  public readonly startTime: Date
  public readonly endTime: Date
  public readonly type: PomodoroIntervalType

  constructor(id: number, startDate: Date, endDate: Date, type: PomodoroIntervalType) {
    this.id = id
    this.startTime = startDate
    this.endTime = endDate
    this.type = type
  }

  get elapsedInterval(): Interval {
    return Interval.fromDates(this.startTime, this.endTime)
  }
}
