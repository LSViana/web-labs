import { Interval } from '~~/layers/pomodoro/types/interval';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/pomodoroType';

// TODO: Don't use the client-side type definition for the `type` property.
export class PomodoroRecord {
  public readonly id: number;
  public readonly startTime: Date;
  public readonly endTime: Date;
  public readonly type: PomodoroIntervalType;

  constructor(id: number, startDate: Date, endDate: Date, type: PomodoroIntervalType) {
    this.id = id;
    this.startTime = startDate;
    this.endTime = endDate;
    this.type = type;
  }

  get elapsedInterval(): Interval {
    return Interval.fromDates(this.startTime, this.endTime);
  }
}
