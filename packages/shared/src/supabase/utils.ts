import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ZodTypeAny } from "zod";
import z from "zod";

export const parseDatabaseResponse = <T extends ZodTypeAny>(res: PostgrestSingleResponse<any>|PostgrestSingleResponse<any[]>, schema:T) => {
    try {
        const { data, error } = res;
        if (error){
            return {data: null, error};
        }
        else if (Array.isArray(data)) {
            return {data:schema.array().parse(data) as z.infer<typeof schema>[], error};
        }
        else{
            return {data:schema.parse(data) as z.infer<typeof schema>, error};
        }
    } catch (error) {
        console.error("Data parsing error:", error);
        return { data: null, error };
    }
}