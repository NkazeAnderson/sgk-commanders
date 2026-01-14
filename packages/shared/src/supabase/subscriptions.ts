import { tables } from "../constants.js";
import { subscriptionsSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

export async function getSubscriptions() {
    const res= await supabase.from(tables.subscriptions).select("*")
    if (res.error) throw res.error
    return subscriptionsSchema.array().parse(res.data)
}
