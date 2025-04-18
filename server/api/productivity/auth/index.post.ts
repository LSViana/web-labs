import { defineEventHandler, readBody, setResponseStatus } from 'h3'

import { useProductivityAuth } from '~/server/services/productivity/auth'
import { useProductivitySupabaseClient } from '~/server/services/productivity/database'

const supabaseClient = useProductivitySupabaseClient()

export default defineEventHandler(async (event) => {
  const {
    email,
    password,
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

  const auth = useProductivityAuth()

  auth.setCredentials(event, existingCredentials.data.id)
})
