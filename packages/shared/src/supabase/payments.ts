import type z from "zod";
import { tables } from "../constants.js";
import { groupsSchema, paymentsSchema, subscriptionsSchema, usersSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

const paymentsTableRef = supabase.from(tables.payments)
export const joinedPaymentSchema = paymentsSchema.extend({
    subscription:subscriptionsSchema,
    by:usersSchema,
    group:groupsSchema.nullish()
})

export type joinedPaymentT = z.infer<typeof joinedPaymentSchema>

export async function getPayments() {
    const res= await paymentsTableRef.select("*, subscription (*), by (*), group (*)")
    if (res.error) throw res.error
    return joinedPaymentSchema.array().parse(res.data)
}