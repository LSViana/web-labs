import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export function usePomodoroNotification() {
  let granted = false

  function notify(type: PomodoroIntervalType): void {
    if (!granted) {
      return
    }

    new Notification(`Finished ${type}.`)
  }

  async function requestPermission(): Promise<void> {
    const permission = await Notification.requestPermission()

    granted = permission === 'granted'
  }

  return {
    notify,
    requestPermission
  }
}
