import { useEffect, useState } from "react";
import { sosResponseT, supabase } from "sgk-commanders-shared";

const useSOS = () => {
  const [sos, setSos] = useState<supabase.sos.joinedSOSSchemaT[]>([]);
  const [activeSos, setActiveSos] = useState<supabase.sos.joinedSOSSchemaT>();
  const [lastSosResponse, setLastSosResponse] = useState<sosResponseT>();

  useEffect(() => {
    if (lastSosResponse && sos) {
      const lastSos = sos.find((item) => item.id === lastSosResponse.sos);
      lastSos && !lastSos.resolved && setActiveSos(lastSos);
    } else {
      activeSos && setActiveSos(undefined);
    }
  }, [lastSosResponse, sos]);
  return {
    sos,
    setSos,
    activeSos,
    setActiveSos,
    lastSosResponse,
    setLastSosResponse,
  };
};

export default useSOS;
