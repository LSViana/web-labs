import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

type PomodoroTypeColors = {
  backgroundInteractive: string
  background: string
  borderHorizontal: string
  stroke: string
}

const workColors = {
  background: 'bg-primary-600',
  backgroundInteractive: 'bg-primary-600 text-primary-50 hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-300',
  borderHorizontal: 'border-primary-800',
  stroke: 'stroke-primary-600',
}

const breakColors = {
  background: 'bg-green-600',
  backgroundInteractive: 'bg-green-600 text-green-50 hover:bg-green-700 active:bg-green-800 focus:ring-green-300',
  borderHorizontal: 'border-green-800',
  stroke: 'stroke-green-600',
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
