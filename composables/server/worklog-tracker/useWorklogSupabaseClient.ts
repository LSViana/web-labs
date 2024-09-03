import { createClient } from '@supabase/supabase-js'

import { useAppConfig } from '#imports'

const config = useAppConfig()

const supabaseClient = createClient(
  config.supabase.url,
  config.supabase.key,
  {
    db: {
      schema: 'worklog_tracker'
    }
  }
)

export function useWorklogSupabaseClient() {
  return supabaseClient
}
