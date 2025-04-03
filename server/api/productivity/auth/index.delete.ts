import { defineEventHandler } from 'h3'

import { usePomodoroAuth } from '~/composables/server/pomodoro/usePomodoroAuth'

export default defineEventHandler(async (event) => {
  const auth = usePomodoroAuth()

  auth.removeCredentials(event)
})
