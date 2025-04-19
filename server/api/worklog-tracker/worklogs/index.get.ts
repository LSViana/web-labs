import { defineEventHandler, getQuery } from 'h3'

import { useProductivityAuth } from '~/server/services/productivity/auth'
import { useWorklogStorage } from '~/server/services/worklog/storage'

const storage = useWorklogStorage()

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
