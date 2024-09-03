import { defineEventHandler, getQuery } from 'h3'

import { useWorklogAuth } from '~/composables/server/worklog-tracker/useWorklogAuth'
import { useWorklogStorage } from '~/composables/server/worklog-tracker/useWorklogStorage'

const storage = useWorklogStorage()

export default defineEventHandler(async (event) => {
  const auth = useWorklogAuth()
  const credentialsId = auth.getCredentials(event)

  const query = getQuery(event)
  let rawDate = query.date?.toString()

  if (!rawDate) {
    rawDate = new Date().toISOString()
  }

  const date = new Date(new Date(rawDate).setHours(0, 0, 0, 0))

  return await storage.load(credentialsId, date)
})
