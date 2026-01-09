"use client";

import React from "react";
import type {
  groupT,
  paymentT,
  subscriptionT,
  userT,
} from "sgk-commanders-shared";
import { supabase } from "sgk-commanders-shared";

export type JoinedPayment = paymentT & {
  subscription: subscriptionT;
  by: userT;
  group?: groupT | null;
};

type PaymentsContextValue = {
  payments: JoinedPayment[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const PaymentsContext = React.createContext<PaymentsContextValue | undefined>(
  undefined
);

export function usePayments() {
  const ctx = React.useContext(PaymentsContext);
  if (!ctx) throw new Error("usePayments must be used within PaymentsProvider");
  return ctx;
}

export function PaymentsProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: JoinedPayment[];
}) {
  const [payments, setPayments] = React.useState<JoinedPayment[]>(
    initialData ?? []
  );
  const [loading, setLoading] = React.useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await supabase.payments.getPayments();
      // cast to unknown first to handle type mismatch with joined structure
      setPayments((res ?? []) as unknown as JoinedPayment[]);
    } catch (err) {
      console.error("Failed to refresh payments:", err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (initialData && initialData.length) {
      setPayments(initialData);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PaymentsContext.Provider value={{ payments, loading, refresh }}>
      {children}
    </PaymentsContext.Provider>
  );
}
