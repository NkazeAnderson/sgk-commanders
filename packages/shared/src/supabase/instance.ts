// "use client"

// import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import 'react-native-url-polyfill/auto'

// Create a single supabase client for interacting with your database


export let supabase = createClient( "http://localhost:54321", "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH", {
  // auth: {
  //   // storage: AsyncStorage,
  //   autoRefreshToken: true,
  //   persistSession: true,
  //   detectSessionInUrl: false,
  // },
})

export function setUpSupabase(params:Parameters<typeof createClient>) {
  supabase = createClient(...params)
}

