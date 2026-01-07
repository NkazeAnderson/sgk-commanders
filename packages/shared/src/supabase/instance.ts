// "use client"

// import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import 'react-native-url-polyfill/auto'

// Create a single supabase client for interacting with your database


export let supabase = createClient( "http://localhost:54321", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0", {
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