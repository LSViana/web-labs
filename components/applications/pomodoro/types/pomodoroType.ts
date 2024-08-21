export enum PomodoroIntervalType {
  work = 'work',
  break = 'break'
}

export const PomodoroIntervalTypeLabels: Record<PomodoroIntervalType, string> = {
  [PomodoroIntervalType.work]: 'Work',
  [PomodoroIntervalType.break]: 'Break'
}
