import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance

  if (typeof window !== 'undefined') {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    supabaseInstance = createClient(url, key)
    return supabaseInstance
  }
  
  return null
}
