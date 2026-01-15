"use client";

import { useLayoutEffect } from "react";
import { supabase as sharedSupabase } from "sgk-commanders-shared";

export default function SupabaseClientInit() {
  useLayoutEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    // Configure the shared supabase client for browser usage
    sharedSupabase.setUpSupabase([url, key]);
  }, []);
  return null;
}
