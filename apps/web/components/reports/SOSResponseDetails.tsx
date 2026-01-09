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
import { useSOSResponses } from "./SOSResponsesContext";

export default function SOSResponseDetails() {
  const params = useParams();
  const router = useRouter();
  const { sosResponses } = useSOSResponses();
  const id = params?.id as string;
  const item = sosResponses.find((r) => r.id === id);

  if (!item) {
    return <div className="p-4">Response not found</div>;
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
              <CardTitle>
                Response from {item.response_by?.name ?? "unknown"}
              </CardTitle>
              <CardDescription>
                {item.created_at
                  ? new Date(item.created_at as string).toLocaleString()
                  : "-"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Alert from</div>
              <div className="font-medium">
                {item.sos?.sent_by?.name ?? "-"}
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Alert Message</div>
              <div className="font-medium">{item.sos?.message ?? "-"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Response</div>
              <div className="font-medium">{item.description ?? "-"}</div>
            </div>

            {item.images && item.images.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground">Images</div>
                <div className="flex gap-2 flex-wrap">
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="response"
                      className="w-32 h-32 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
