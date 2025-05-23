import type { RealtimeChannel } from '@supabase/realtime-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

import { useAppConfig } from '#imports';

type Supabase = {
  client: SupabaseClient
  channel: RealtimeChannel
  channelConnected: Promise<void>
};

function buildSupabase(): Supabase {
  const config = useAppConfig();

  const client = createClient(config.supabase.url, config.supabase.key, {
    auth: {
      persistSession: false,
    },
  });
  const channel = client.channel('web-labs');
  const channelConnected = getChannelConnectedPromise(channel);

  return {
    client,
    channel,
    channelConnected,
  };
}

function getChannelConnectedPromise(channel: RealtimeChannel): Promise<void> {
  return new Promise((resolve, reject) => {
    channel.subscribe((status, error) => {
      if (status === 'SUBSCRIBED') {
        resolve();
      }
      else {
        reject(error);
      }
    });
  });
}

export function useSupabaseClient(): Supabase | undefined {
  if (!import.meta.client) {
    return;
  }

  return buildSupabase();
}

// Server-state
let supabaseServer: Supabase | undefined;

export function useSupabaseServer(): Supabase | undefined {
  if (!import.meta.server) {
    return;
  }

  if (!supabaseServer) {
    supabaseServer = buildSupabase();
  }

  return supabaseServer;
}
