import { useState } from "react";
import { supabase } from "sgk-commanders-shared";
import { joinedSOSResponseT } from "sgk-commanders-shared/dist/supabase/sos";

const useSOS = () => {
  const [sos, setSos] = useState<supabase.sos.joinedSOSSchemaT[]>([]);
  const [sosResponses, setSosResponses] = useState<joinedSOSResponseT[]>([]);

  return {
    sos,
    setSos,
    sosResponses,
    setSosResponses,
  };
};

export default useSOS;
