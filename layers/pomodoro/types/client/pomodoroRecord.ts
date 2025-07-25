import { usePomodoroNow } from '~~/layers/pomodoro/composables/usePomodoroNow';
import { Interval } from '~~/layers/pomodoro/types/client/interval';
import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

const pomodoroDate = usePomodoroNow();

export class PomodoroRecord {
  public readonly id: number | undefined;
  public readonly startTime: Date;
  public readonly endTime: Date;
  public readonly type: PomodoroIntervalType;

  constructor(
    id: number | undefined = undefined,
    startDate: Date = pomodoroDate.getToday(),
    endDate: Date = pomodoroDate.getToday(),
    type: PomodoroIntervalType = PomodoroIntervalType.work,
  ) {
    this.id = id;
    this.startTime = startDate;
    this.endTime = endDate;
    this.type = type;
  }

  get elapsedInterval(): Interval {
    return Interval.fromDates(this.startTime, this.endTime);
  }
}
