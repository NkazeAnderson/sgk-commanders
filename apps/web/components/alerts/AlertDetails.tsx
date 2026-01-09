"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import UserCard from "../users/UserCard";
import { useSOS } from "./SOSContext";

export default function AlertDetails() {
  const params = useParams();
  const router = useRouter();
  const { sos, sosResponses } = useSOS();
  const id = params?.id as string;
  const item = sos.find((s) => s.id === id);

  if (!item) {
    return <div className="p-4">Alert not found</div>;
  }

  return (
    <div className="p-4 max-w-3xl h-full overflow-y-scroll">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer" onClick={() => router.back()}>
              <ArrowLeft />
            </div>
            <div>
              <CardTitle>
                Alert from {item.sent_by?.name ?? "unknown"}
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
            <UserCard user={item.sent_by} />
            <div>
              <div className="text-sm text-muted-foreground">Message</div>
              <div className="font-medium">{item.message ?? "-"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Resolved</div>
              <div className="font-medium">{item.resolved ? "Yes" : "No"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="font-medium">
                {item.location &&
                typeof item.location.latitude === "number" &&
                typeof item.location.longitude === "number" ? (
                  <a
                    className="text-primary underline"
                    href={`https://www.google.com/maps/search/?api=1&query=${item.location.latitude},${item.location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`${item.location.latitude}, ${item.location.longitude}`}
                  </a>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
          <div>
            <h2>Responses</h2>
            <h3>Agents</h3>
            <div className="grid grid-cols-2 gap-2">
              {sosResponses
                .filter((res) => res.sos.id === item.id)
                .map((item) => (
                  <div key={item.id}>
                    <UserCard user={item.response_by} />
                    {item.description && (
                      <>
                        <b>Message</b>
                        <p>{item.description}</p>
                      </>
                    )}
                    {item.images && (
                      <>
                        <b>Images</b>
                        {item.images.map((item) => {
                          return (
                            <Image
                              key={item}
                              src={item}
                              alt="response images"
                              width={100}
                              height={100}
                              className="rounded-md"
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
