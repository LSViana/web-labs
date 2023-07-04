import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { RealtimeChannel } from '@supabase/realtime-js'

import { useAppConfig } from '#app'

type Supabase = {
  client: SupabaseClient;
  channel: RealtimeChannel;
  channelConnected: Promise<void>;
}

function getChannelConnectedPromise (channel: RealtimeChannel): Promise<void> {
  return new Promise((resolve, reject) => {
    channel.subscribe((status, error) => {
      if (status === 'SUBSCRIBED') {
        resolve()
      } else {
        reject(error)
      }
    })
  })
}

export function useSupabaseClient (): Supabase | undefined {
  if (!process.client) {
    return
  }

  const config = useAppConfig()
  const client = createClient(config.supabase.url, config.supabase.key)
  const channel = client.channel('web-labs')
  const channelConnected = getChannelConnectedPromise(channel)

  return {
    client,
    channel,
    channelConnected
  }
}

// Server-state
let supabaseServer: Supabase | undefined

export function useSupabaseServer (): Supabase | undefined {
  if (!process.server) {
    return
  }

  if (!supabaseServer) {
    const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const channel = client.channel('web-labs')
    const channelConnected = getChannelConnectedPromise(channel)

    supabaseServer = {
      client,
      channel,
      channelConnected
    }
  }

  return supabaseServer
}
