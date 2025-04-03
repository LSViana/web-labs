import { defineEventHandler, getQuery } from 'h3'

import { usePomodoroStorage } from '~/composables/server/pomodoro/usePomodoroStorage'
import { useProductivityAuth } from '~/composables/server/productivity/auth/useProductivityAuth'

const storage = usePomodoroStorage()

export default defineEventHandler(async (event) => {
  const auth = useProductivityAuth()
  const credentialsId = auth.getCredentials(event)

  const query = getQuery(event)
  let rawDate = query.date?.toString()

  if (!rawDate) {
    rawDate = new Date().toISOString()
  }

  const date = new Date(new Date(rawDate).setHours(0, 0, 0, 0))

  return await storage.load(credentialsId, date)
})
