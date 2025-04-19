import { defineEventHandler, send, setResponseStatus } from 'h3'

import { useSupabaseServer } from '~/composables/rtc/supabase'

export default defineEventHandler(async (event): Promise<void> => {
  const supabase = useSupabaseServer()

  if (!supabase) {
    setResponseStatus(event, 500)

    return await send(event)
  }

  await supabase.channelConnected

  await supabase.channel.send({
    type: 'broadcast',
    event: 'value',
    value: 'This value is from the server',
  })

  setResponseStatus(event, 200)

  return await send(event)
})
