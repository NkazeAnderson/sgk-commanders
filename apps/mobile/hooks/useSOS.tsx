import { unknownErrorHandler } from "@/utils";
import { useEffect, useState } from "react";
import { supabase, userT } from "sgk-commanders-shared";
import { getSOSResponses, getSOSs, joinedSOSResponseT } from "sgk-commanders-shared/dist/supabase/sos";

const useSOS = (user:userT) => {
  const [sos, setSos] = useState<supabase.sos.joinedSOSSchemaT[]>([]);
  const [sosResponses, setSosResponses] = useState<joinedSOSResponseT[]>([]);

  const activeSos = user.is_agent ? sosResponses.find((item=>!item.sos.resolved && item.response_by.id === user.id))?.sos : undefined;
  const activeResponses = sosResponses.filter((item)=> item.sos.id === activeSos?.id)

  useEffect(()=>{
        getSOSs(!user.is_agent? user.id:undefined).then((res) => {
            setSos(res)
          }).catch((e) => {
            unknownErrorHandler(e);
          });   
  },[])

   useEffect(() => {
    if (sos.length) {
      getSOSResponses().then((responses) => {
        setSosResponses(responses);
    }).catch(e=>{
      unknownErrorHandler(e);
    })}
  }, [sos]);

  return {
    sos,
    setSos,
    sosResponses,
    setSosResponses,
    activeSos,
    activeResponses
  };
};

export default useSOS;
