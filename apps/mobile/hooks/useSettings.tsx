import { unknownErrorHandler } from "@/utils";
import { useEffect, useState } from "react";
import { settingsT } from "sgk-commanders-shared";
import { getSettings } from "sgk-commanders-shared/dist/supabase/settings";

export function useSettings (){

     const [settings, setSettings] = useState<settingsT["settings"]>({});

    useEffect(()=>{
        getSettings().then((res) => {
          res && setSettings(res);
        }).catch(e=>{unknownErrorHandler(e)});
    },[])
    return {
        settings
    }
}