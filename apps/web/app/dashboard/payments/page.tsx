"use client";

import PaymentsList from "@/components/payments/PaymentsList";

export default function PaymentsPage() {
  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-4 overflow-x-auto">
      <PaymentsList />
    </div>
  );
}
