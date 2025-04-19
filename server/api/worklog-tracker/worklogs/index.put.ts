import { defineEventHandler, readBody } from 'h3'

import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useProductivityAuth } from '~/server/services/productivity/auth'
import { useWorklogStorage } from '~/server/services/worklog/storage'

const storage = useWorklogStorage()

export default defineEventHandler(async (event) => {
  const worklogItem = await readBody<WorklogItem>(event, { strict: true })

  const auth = useProductivityAuth()
  const credentialsId = auth.getCredentials(event)

  return await storage.update(worklogItem, credentialsId)
})
