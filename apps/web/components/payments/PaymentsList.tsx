"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { usePayments } from "./PaymentsContext";

export default function PaymentsList() {
  const { payments, loading, refresh } = usePayments();
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Payments</h3>
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => await refresh()}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-auto">
        <Table>
          <TableHeader>
            <tr>
              <TableHead>From</TableHead>
              <TableHead className="hidden sm:table-cell">Amount</TableHead>
              <TableHead className="hidden md:table-cell">Months</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="hidden lg:table-cell">Group</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                onClick={() => router.push(`/dashboard/payments/${payment.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>{payment.by?.name ?? "-"}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {payment.amount}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {payment.months ?? "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      payment.status === "success"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status ?? "pending"}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {payment.date
                    ? new Date(payment.date as string).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {payment.group?.name ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
