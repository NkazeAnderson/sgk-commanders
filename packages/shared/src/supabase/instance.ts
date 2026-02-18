// "use client"

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types.js";

// Create a single supabase client for interacting with your database

export let supabase = createClient<Database>(
  "http://172.20.10.8:54321",
  "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH",
);

export function setUpSupabase(params: Parameters<typeof createClient>) {
  supabase = createClient<Database>(...params);
  console.log("Successfully setup supabase");
}
