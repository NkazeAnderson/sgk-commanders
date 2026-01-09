import { tables } from "../constants.js";
import { settingsSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

const settingsTableRef = supabase.from(tables.settings)

export const getSettings = async ()=>{
    const res = await settingsTableRef.select("*")
    if (res.data?.length) {
        const {settings} = settingsSchema.parse(res.data[0])
        return settings
    }
    return null
}