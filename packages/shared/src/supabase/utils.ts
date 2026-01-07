import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ZodTypeAny } from "zod";

export const parseDatabaseResponse = <T extends ZodTypeAny , U extends PostgrestSingleResponse< any> , K extends PostgrestSingleResponse<any[]> >(res: U|K, schema:T) => {
    
        const { data, error } = res;
        if (error){
            console.error(error)
            throw new Error("Supabase error");
        }
        else{
            return schema.parse(data) 
        }
   
}