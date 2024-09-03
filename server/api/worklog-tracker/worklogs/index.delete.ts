import { defineEventHandler, getQuery } from 'h3'

import { useWorklogAuth } from '~/composables/server/worklog-tracker/useWorklogAuth'
import { useWorklogStorage } from '~/composables/server/worklog-tracker/useWorklogStorage'

const storage = useWorklogStorage()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const issueId = query.issueId
  const worklogId = query.worklogId

  if (typeof issueId !== 'string' || typeof worklogId !== 'string' ||
    issueId.trim().length === 0 || worklogId.trim().length === 0) {
    throw new Error('Invalid query')
  }

  const auth = useWorklogAuth()
  const credentialsId = auth.getCredentials(event)

  await storage.remove(issueId, worklogId, credentialsId)

  return {
    status: 204,
    valid: query
  }
})
