import { tables } from "../constants.js";
import { subscriptionsSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

const subscriptionsTableRef = supabase.from(tables.subscriptions)

export async function getSubscriptions() {
    const res= await subscriptionsTableRef.select("*")
    if (res.error) throw res.error
    return subscriptionsSchema.array().parse(res.data)
}
