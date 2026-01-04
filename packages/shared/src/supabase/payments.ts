import { tables } from "../constants.js";
import { paymentsSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";
import { parseDatabaseResponse } from "./utils.js";

const paymentsTableRef = supabase.from(tables.payments)

export async function getpayments() {
    const res= await paymentsTableRef.select("*")
    return parseDatabaseResponse(res, paymentsSchema)
}