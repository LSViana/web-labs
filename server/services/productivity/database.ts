import { createClient } from '@supabase/supabase-js'

import { useAppConfig } from '#imports'

const config = useAppConfig()

const supabaseClient = createClient(
  config.supabase.url,
  config.supabase.key,
  {
    db: {
      schema: 'productivity',
    },
  },
)

export function useProductivitySupabaseClient() {
  return supabaseClient
}
