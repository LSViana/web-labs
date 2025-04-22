import type { PomodoroInterval } from '~~/layers/pomodoro/types/client/pomodoroInterval';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';
import { TypedEvent } from '~~/layers/pomodoro/types/client/typedEvent';

export class PomodoroIntervalEvent extends TypedEvent {
  public readonly interval: PomodoroInterval;

  constructor(interval: PomodoroInterval) {
    super('interval');

    this.interval = interval;
  }
}

export class PomodoroNotificationEvent extends TypedEvent {
  public readonly intervalType: PomodoroIntervalType;

  constructor(type: PomodoroIntervalType) {
    super('notification');

    this.intervalType = type;
  }
}

export interface PomodoroEventMap {
  interval: PomodoroIntervalEvent
  notification: PomodoroNotificationEvent
}
