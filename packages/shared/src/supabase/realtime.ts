import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { supabase } from "./instance.js";

export const postgresChangesChannel = supabase
  .channel('schema-db-changes')

export  function registerToPostgresChanges(callback:(payload:RealtimePostgresChangesPayload<{
    [key: string]: any;
}>)=>void, updateRegistrationStatus:(registered:boolean|undefined)=>void) {
  postgresChangesChannel
  .on(
    'postgres_changes',
    {
      event: '*', // Listen only to INSERTs
      schema: 'public',
    },
    (payload) => callback(payload)
  )
  .subscribe((status)=>{
    console.log("Realtime subscription",{status});
    status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED ? updateRegistrationStatus(true) :  updateRegistrationStatus(false)
  })
  }