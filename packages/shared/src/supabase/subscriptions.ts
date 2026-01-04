import { tables } from "../constants.js";
import { subscriptionsSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";
import { parseDatabaseResponse } from "./utils.js";

const subscriptionsTableRef = supabase.from(tables.subscriptions)

export async function getSubscriptions() {
    const res= await subscriptionsTableRef.select("*")
    return parseDatabaseResponse(res, subscriptionsSchema)
}
