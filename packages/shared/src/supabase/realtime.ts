import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { supabase } from "./instance.js";

export  function registerToPostgresChanges(callback:(payload:RealtimePostgresChangesPayload<{
    [key: string]: {id:string};
}>)=>void, updateRegistrationStatus:(registered:boolean|undefined)=>void) {
  supabase
  .channel('schema-db-changes')
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