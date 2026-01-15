"use client";

import SOSResponsesList from "@/components/reports/SOSResponsesList";

export default function ReportsPage() {
  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-4 overflow-x-auto">
      <SOSResponsesList />
    </div>
  );
}
