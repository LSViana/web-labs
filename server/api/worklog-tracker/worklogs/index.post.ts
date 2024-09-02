import { defineEventHandler, readBody } from 'h3'

import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useWorklogAuth } from '~/composables/server/worklog-tracker/useWorklogAuth'
import { useWorklogStorage } from '~/composables/server/worklog-tracker/useWorklogStorage'

const storage = useWorklogStorage()

export default defineEventHandler(async (event) => {
  const worklogItem = await readBody<WorklogItem>(event, { strict: true })

  const auth = useWorklogAuth()
  const credentialsId = auth.getCredentials(event)

  return await storage.save(worklogItem, credentialsId)
})
