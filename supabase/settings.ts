import { tables } from "@/supabase/functions/_shared/constant";
import { settingsSchema } from "@/zodSchema";
import { supabase } from ".";

const settingsTableRef = supabase.from(tables.settings)

export const getSettings = async ()=>{
    const res = await settingsTableRef.select("*")
    if (res.data?.length) {
        const {settings} = settingsSchema.parse(res.data[0])
        return settings
    }
    return null
}