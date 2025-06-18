import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Validate that we're not using placeholder values
if (supabaseUrl.includes('your-project-id') || supabaseUrl === 'https://your-project-id.supabase.co') {
  throw new Error('Please update VITE_SUPABASE_URL in your .env file with your actual Supabase project URL')
}

if (supabaseAnonKey === 'your-anon-key-here' || supabaseAnonKey.length < 100) {
  throw new Error('Please update VITE_SUPABASE_ANON_KEY in your .env file with your actual Supabase anonymous key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})