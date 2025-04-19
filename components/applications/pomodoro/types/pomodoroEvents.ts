import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { TypedEvent } from '~/components/applications/pomodoro/types/typedEvent'

export class PomodoroIntervalEvent extends TypedEvent {
  public readonly interval: PomodoroInterval

  constructor(interval: PomodoroInterval) {
    super('interval')

    this.interval = interval
  }
}

export class PomodoroNotificationEvent extends TypedEvent {
  public readonly intervalType: PomodoroIntervalType

  constructor(type: PomodoroIntervalType) {
    super('notification')

    this.intervalType = type
  }
}

export interface PomodoroEventMap {
  interval: PomodoroIntervalEvent
  notification: PomodoroNotificationEvent
}
