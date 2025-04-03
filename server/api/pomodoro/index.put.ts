import { defineEventHandler, readBody } from 'h3'

import type { PomodoroItem } from '~/composables/server/pomodoro/types/pomodoroItem'
import { usePomodoroStorage } from '~/composables/server/pomodoro/usePomodoroStorage'
import { useProductivityAuth } from '~/composables/server/productivity/auth/useProductivityAuth'

const storage = usePomodoroStorage()

export default defineEventHandler(async (event) => {
  const pomodoroItem = await readBody<PomodoroItem>(event, { strict: true })

  const auth = useProductivityAuth()
  const credentialsId = auth.getCredentials(event)

  await storage.update(pomodoroItem, credentialsId)
})
