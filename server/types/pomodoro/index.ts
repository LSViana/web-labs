import { usePomodoroNow } from '~/components/applications/pomodoro/usePomodoroNow'

const pomodoroNow = usePomodoroNow()

export enum PomodoroIntervalType {
  work = 'work',
  break = 'break'
}

export class Pomodoro {
  public id: number
  public startTime: Date
  public endTime: Date
  public type: PomodoroIntervalType

  constructor(
    id = 0,
    startTime = pomodoroNow.get(),
    endTime = pomodoroNow.get(),
    type = PomodoroIntervalType.work
  ) {
    this.id = id
    this.startTime = startTime
    this.endTime = endTime
    this.type = type
  }
}
