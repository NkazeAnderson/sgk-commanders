// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { type } from "node:os";
import { createClient } from 'npm:@supabase/supabase-js@2'
import {sendPushNotification} from "../_shared/utils.ts"
import {notificationMessageT} from "../_shared/types.ts"

type actionT = "create" | "intervene" | "resolve"

type userT = { deviceIds?: string[], id: string }

Deno.serve(async (req) => {
  const { action, data } = await req.json()
  console.log(data);
  
  const authorization = req.headers.get('Authorization')!
  const token = authorization.replace('Bearer ', '')
  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authorization } } });

  const { data: { user: userSessionData }, error: userError } = await supabase.auth.getUser(token)

  if (userError || !userSessionData) {
    return new Response(
      JSON.stringify(userError),
      { headers: { "Content-Type": "application/json" }, status: 403 },
    )
  }

  const allGroupMembers: userT[] = []


  const { data: user } = await supabase.from("users").select("*").eq("id", userSessionData.id).limit(1).single()
  
  let sos = null
  if (action === "create") {
    sos = await supabase.from("sos").insert(data).single()
  }
  
  const { data: groups } = await supabase.from("group_members").select("group_id").eq("member_id", userSessionData.id)
  if (groups) {

    for (const group of groups) {
      let { data: groupMembers } = await supabase.from("group_members").select("member_id").eq("group_id", group.group_id)
      groupMembers = groupMembers || []
      for (const groupMember of groupMembers) {
        const { data: userData }: { data: userT | null } = await supabase.from("users").select("*").eq("id", groupMember.member_id).limit(1).single()
        userData && allGroupMembers.push(userData)
      }
    }

  }
  
  
  const deviceIds = allGroupMembers.flatMap(item=>item.deviceIds)

    deviceIds.forEach((item) => {
            const notificationMessage:notificationMessageT = {
                to:item!,
                title:"Payment Failed",
                body:"Your subscription payment failed",
                data:{sos:"1234567"}
            }
            sendPushNotification(notificationMessage)
          });
  
  console.log(deviceIds);
  return new Response(
    JSON.stringify(sos),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sos' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
