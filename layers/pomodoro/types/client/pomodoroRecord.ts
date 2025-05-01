import { Interval } from '~~/layers/pomodoro/types/client/interval';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

export class PomodoroRecord {
  public readonly id: number | undefined;
  public readonly startTime: Date;
  public readonly endTime: Date;
  public readonly type: PomodoroIntervalType;

  constructor(id: number | undefined, startDate: Date, endDate: Date, type: PomodoroIntervalType) {
    this.id = id;
    this.startTime = startDate;
    this.endTime = endDate;
    this.type = type;
  }

  get elapsedInterval(): Interval {
    return Interval.fromDates(this.startTime, this.endTime);
  }
}
