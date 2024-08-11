import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { TypedEvent } from '~/components/applications/pomodoro/types/typedEvent'

export class PomodoroIntervalEvent extends TypedEvent {
  public readonly interval: PomodoroInterval

  constructor(interval: PomodoroInterval) {
    super('interval')

    this.interval = interval
  }
}

export interface PomodoroEventMap {
  'interval': PomodoroIntervalEvent
}
