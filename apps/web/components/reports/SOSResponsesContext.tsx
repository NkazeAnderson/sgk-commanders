"use client";

import React from "react";
import type { sosResponseT, userT } from "sgk-commanders-shared";
import { supabase } from "sgk-commanders-shared";
import { getPayments } from "sgk-commanders-shared/dist/supabase/payments";

export type JoinedSOSResponse = sosResponseT & {
  sos: {
    id: string;
    message?: string | null;
    sent_by: userT;
  };
  response_by: userT;
};

type SOSResponsesContextValue = {
  sosResponses: JoinedSOSResponse[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const SOSResponsesContext = React.createContext<
  SOSResponsesContextValue | undefined
>(undefined);

export function useSOSResponses() {
  const ctx = React.useContext(SOSResponsesContext);
  if (!ctx)
    throw new Error("useSOSResponses must be used within SOSResponsesProvider");
  return ctx;
}

export function SOSResponsesProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: JoinedSOSResponse[];
}) {
  const [sosResponses, setSOSResponses] = React.useState<JoinedSOSResponse[]>(
    initialData ?? []
  );
  const [loading, setLoading] = React.useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await supabase.sos.getSOSResponses();
      // cast to unknown first to handle type mismatch with joined structure
      setSOSResponses((res ?? []) as unknown as JoinedSOSResponse[]);
      console.log("payments", await getPayments());
    } catch (err) {
      console.error("Failed to refresh sos responses:", err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (initialData && initialData.length) {
      setSOSResponses(initialData);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SOSResponsesContext.Provider value={{ sosResponses, loading, refresh }}>
      {children}
    </SOSResponsesContext.Provider>
  );
}
