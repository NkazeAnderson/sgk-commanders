import { tables } from "@/supabase/functions/_shared/constant";
import { paymentsSchema } from "@/supabase/functions/_shared/zodSchema";
import { parseDatabaseResponse } from "@/utils";
import { supabase } from ".";

const paymentsTableRef = supabase.from(tables.payments)

export async function getpayments() {
    const res= await paymentsTableRef.select("*")
    return parseDatabaseResponse(res, paymentsSchema)
}