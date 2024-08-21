import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

type PomodoroTypeColors = {
  backgroundInteractive: string;
  background: string;
  border: string;
  stroke: string;
}

const workColors = {
  background: 'bg-primary-500',
  backgroundInteractive: 'bg-primary-500 text-primary-50 hover:bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-300',
  border: 'border border-primary-800',
  stroke: 'stroke-primary-500'
}

const breakColors = {
  background: 'bg-green-600',
  backgroundInteractive: 'bg-green-600 text-green-50 hover:bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300',
  border: 'border border-green-800',
  stroke: 'stroke-green-600'
}

export function getPomodoroTypeColor(type: PomodoroIntervalType): PomodoroTypeColors {
  switch (type) {
    case PomodoroIntervalType.work:
      return workColors
    case PomodoroIntervalType.break:
      return breakColors
    default:
      throw Error(`Unable to calculate duration for ${type}.`)
  }
}
