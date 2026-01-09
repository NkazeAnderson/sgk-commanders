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
import { useSOS } from "./SOSContext";

export default function SOSList() {
  const { sos, loading, refresh } = useSOS();
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Alerts</h3>
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
              <TableHead>Message</TableHead>
              <TableHead className="hidden sm:table-cell">Sender</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="w-12">Resolved</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {sos.map((s) => (
              <TableRow
                key={s.id}
                onClick={() => router.push(`/dashboard/alerts/${s.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  {s.message ? s.message.slice(0, 120) : "(no message)"}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {s.sent_by?.name ?? "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {s.created_at
                    ? new Date(s.created_at as string).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>{s.resolved ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
