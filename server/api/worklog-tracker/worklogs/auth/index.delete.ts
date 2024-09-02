import { defineEventHandler } from 'h3'

import { useWorklogAuth } from '~/composables/server/worklog-tracker/useWorklogAuth'

export default defineEventHandler(async (event) => {
  const auth = useWorklogAuth()

  auth.removeCredentials(event)
})
