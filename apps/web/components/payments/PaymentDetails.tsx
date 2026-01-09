"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { usePayments } from "./PaymentsContext";

export default function PaymentDetails() {
  const params = useParams();
  const router = useRouter();
  const { payments } = usePayments();
  const id = params?.id as string;
  const item = payments.find((p) => p.id === id);

  if (!item) {
    return <div className="p-4">Payment not found</div>;
  }

  return (
    <div className="p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer" onClick={() => router.back()}>
              <ArrowLeft />
            </div>
            <div>
              <CardTitle>Payment from {item.by?.name ?? "unknown"}</CardTitle>
              <CardDescription>
                {item.date
                  ? new Date(item.date as string).toLocaleDateString()
                  : "-"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="font-medium">{item.amount}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Months</div>
              <div className="font-medium">{item.months ?? "-"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-medium">
                <span
                  className={`px-2 py-1 rounded text-sm inline-block ${
                    item.status === "success"
                      ? "bg-green-100 text-green-800"
                      : item.status === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.status ?? "pending"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Subscription</div>
              <div className="font-medium">
                {item.subscription?.name ?? "-"}
              </div>
            </div>

            {item.group && (
              <div>
                <div className="text-sm text-muted-foreground">Group</div>
                <div className="font-medium">{item.group.name ?? "-"}</div>
              </div>
            )}

            {item.phone && (
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{item.phone}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
