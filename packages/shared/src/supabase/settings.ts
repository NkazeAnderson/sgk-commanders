import { tables } from "../constants.js";
import { settingsSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

export const getSettings = async ()=>{
    const res = await supabase.from(tables.settings).select("*")
    if (res.data?.length) {
        const {settings} = settingsSchema.parse(res.data[0])
        return settings
    }
    return null
}