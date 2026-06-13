import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance

  const url = import.meta.env?.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key must be provided.')
  }
  supabaseInstance = createClient(url, key)
  return supabaseInstance
}
