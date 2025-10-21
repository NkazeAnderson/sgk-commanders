<<<<<<< HEAD
import { tables } from "@/supabase/functions/_shared/constant";
import { subscriptionsSchema } from "@/supabase/functions/_shared/zodSchema";
=======
import { tables } from "@/constants";
>>>>>>> parent of b4a3173 (refactored sign in and up features)
import { parseDatabaseResponse } from "@/utils";
import { supabase } from ".";

const subscriptionsTableRef = supabase.from(tables.subscriptions)

export async function getSubscriptions() {
    const res= await subscriptionsTableRef.select("*")
    return parseDatabaseResponse(res, subscriptionsSchema)
}