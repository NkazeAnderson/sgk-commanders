import { unknownErrorHandler } from "@/utils";
import { useEffect, useState } from "react";
import { subscriptionT } from "sgk-commanders-shared";
import { getSubscriptions } from "sgk-commanders-shared/dist/supabase/subscriptions";

export function useSubscriptions (){
    const [subscriptions, setSubscriptions] = useState<subscriptionT[]>([]);
    useEffect(()=>{
        getSubscriptions().then((res) => {
         setSubscriptions(res);
        }).catch(e=>{
            unknownErrorHandler(e)
        });
    },[])

    return {
        subscriptions
    }
}