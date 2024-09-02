import { defineEventHandler, readBody, setResponseStatus } from 'h3'

import { useWorklogAuth } from '~/composables/server/worklog-tracker/useWorklogAuth'
import { useWorklogSupabaseClient } from '~/composables/server/worklog-tracker/useWorklogSupabaseClient'

const supabaseClient = useWorklogSupabaseClient()

export default defineEventHandler(async (event) => {
  const {
    email,
    password
  } = await readBody(event, { strict: true })

  const existingCredentials = await supabaseClient
    .from('credentials')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single()

  if (!existingCredentials.data) {
    setResponseStatus(event, 401)

    return
  }

  const auth = useWorklogAuth()

  auth.setCredentials(event, existingCredentials.data.id)
})
