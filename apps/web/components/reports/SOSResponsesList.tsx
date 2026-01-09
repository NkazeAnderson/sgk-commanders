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
import { useSOSResponses } from "./SOSResponsesContext";

export default function SOSResponsesList() {
  const { sosResponses, loading, refresh } = useSOSResponses();
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">SOS Responses</h3>
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
              <TableHead>Alert from</TableHead>
              <TableHead className="hidden sm:table-cell">Responder</TableHead>
              <TableHead className="hidden md:table-cell">Response</TableHead>
              <TableHead className="hidden lg:table-cell">
                Responded at
              </TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {sosResponses.map((resp) => (
              <TableRow
                key={resp.id}
                onClick={() => router.push(`/dashboard/reports/${resp.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>{resp.sos?.sent_by?.name ?? "-"}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {resp.response_by?.name ?? "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {resp.description
                    ? resp.description.slice(0, 80)
                    : "(no message)"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {resp.created_at
                    ? new Date(resp.created_at as string).toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
