"use client";

import React from "react";
import type { sosT, userT } from "sgk-commanders-shared";
import { supabase } from "sgk-commanders-shared";
import {
  getSOSResponses,
  joinedSOSResponseT,
} from "sgk-commanders-shared/dist/supabase/sos";

export type JoinedSOS = sosT & { sent_by: userT };

type SOSContextValue = {
  sos: JoinedSOS[];
  loading: boolean;
  refresh: () => Promise<void>;
  sosResponses: joinedSOSResponseT[];
};

const SOSContext = React.createContext<SOSContextValue | undefined>(undefined);

export function useSOS() {
  const ctx = React.useContext(SOSContext);
  if (!ctx) throw new Error("useSOS must be used within SOSProvider");
  return ctx;
}

export function SOSProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: JoinedSOS[];
}) {
  const [sos, setSOS] = React.useState<JoinedSOS[]>(initialData ?? []);
  const [sosResponses, setSOSResponses] = React.useState<joinedSOSResponseT[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await supabase.sos.getSOSs();
      // supabase.sos.getSOSs has a looser type; cast to our JoinedSOS[] since the query joins sent_by
      setSOS((res ?? []) as JoinedSOS[]);
    } catch (err) {
      console.error("Failed to refresh sos:", err);
    } finally {
      setLoading(false);
    }
    try {
      const res = await getSOSResponses();
      // supabase.sos.getSOSs has a looser type; cast to our JoinedSOS[] since the query joins sent_by
      setSOSResponses(res ?? []);
    } catch (err) {
      console.error("Failed to refresh sosResponses:", err);
    } finally {
      //  setLoading(false);
    }
  }

  React.useEffect(() => {
    if (initialData && initialData.length) {
      setSOS(initialData);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SOSContext.Provider value={{ sos, loading, refresh, sosResponses }}>
      {children}
    </SOSContext.Provider>
  );
}
