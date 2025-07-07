import { usePomodoroDate } from '~~/layers/pomodoro/composables/usePomodoroDate';
import { Interval } from '~~/layers/pomodoro/types/client/interval';
import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

const pomodoroDate = usePomodoroDate();

export class PomodoroRecord {
  public readonly id: number | undefined;
  public readonly startTime: Date;
  public readonly endTime: Date;
  public readonly type: PomodoroIntervalType;

  constructor(
    id: number | undefined = undefined,
    startDate: Date = pomodoroDate.getNow(),
    endDate: Date = pomodoroDate.getNow(),
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
