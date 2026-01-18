"use client";

import { useGroups } from "@/components/groups/GroupsContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Edit,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { groupT as Group } from "sgk-commanders-shared";

export default function GroupsTable({
  initialData,
}: { initialData?: Group[] } = {}) {
  const { groups, loading, refresh, deleteGroup, addGroup } =
    useGroups();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const router = useRouter();


  const selectedIds = useMemo(
    () => Object.keys(selected).filter((k) => selected[k]),
    [selected]
  );
  const allSelected =
    selectedIds.length > 0 && selectedIds.length === groups.length;

  function toggleSelectAll() {
    if (allSelected) {
      setSelected({});
      return;
    }
    const next: Record<string, boolean> = {};
    groups.forEach((g) => (next[g.id] = true));
    setSelected(next);
  }

  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  async function handleDeleteSelected() {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} selected groups?`)) return;
    const ids = [...selectedIds];
    for (const id of ids) {
      await deleteGroup(id);
    }
    setSelected({});
  }

  async function handleDeleteOne(id: string) {
    if (!confirm("Delete group?")) return;
    await deleteGroup(id);
    setSelected((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });
  }

  const [sort, setSort] = useState<{
    key: keyof Group | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups.filter((g) => {
      if (!q) return true;
      return (
        g.name.toLowerCase().includes(q) ||
        (g.subcription ?? "").toLowerCase().includes(q)
      );
    });
  }, [groups, query]);

  const sorted = useMemo(() => {
    if (!sort.key || !sort.direction) return filtered;
    const sortedCopy = [...filtered].sort((a, b) => {
      const aVal = a[sort.key!];
      const bVal = b[sort.key!];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (sort.key === "subcriptionExpiration") {
        const da = new Date(aVal as string).getTime();
        const db = new Date(bVal as string).getTime();
        return sort.direction === "asc" ? da - db : db - da;
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sort.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sortedCopy;
  }, [filtered, sort]);

  function toggleSort(key: keyof Group) {
    setSort((s) => {
      if (s.key !== key) return { key, direction: "asc" };
      if (s.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: null };
    });
  }

  async function handleAdd() {
    const id = String(Date.now());
    const newGroup: Group = {
      id,
      admin_id: id,
      name: `New Group ${id.slice(-4)}`,
      is_organisation: false,
      subcription: null,
      subcriptionExpiration: null,
    } as Group;

    await addGroup(newGroup);
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold">Groups</h3>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <Input
              placeholder="Search groups..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-[220px]"
            />
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={() => toggleSelectAll()}
            aria-label="Select all"
          />

          <div className="text-sm text-muted-foreground">
            {selectedIds.length} selected
          </div>

          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              className="flex items-center gap-2"
            >
              <Trash className="size-4" /> Delete
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : null}

          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await refresh();
            }}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-auto">
        <Table>
          <TableHeader>
            <tr>
              <TableHead className="w-[48px]" />
              <TableHead>
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => toggleSort("name")}
                >
                  <span>Name</span>
                  {sort.key !== "name" ? (
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                  ) : sort.direction === "asc" ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>
              </TableHead>

              <TableHead className="hidden md:table-cell">
                Subscription
              </TableHead>
              <TableHead className="hidden md:table-cell">Admin</TableHead>
              <TableHead className="hidden lg:table-cell">Expires</TableHead>
              <TableHead className="w-[48px]">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {sorted.map((group) => (
              <TableRow
                key={group.id}
                data-state={selected[group.id] ? "selected" : undefined}
                onClick={() => router.push(`/dashboard/groups/${group.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <Checkbox
                    checked={!!selected[group.id]}
                    onCheckedChange={(checked) => {
                      checked;
                      toggleSelect(group.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select ${group.name}`}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {group.is_organisation ? "Organisation" : "Group"}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {group.subcription ?? "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {group.admin_id ?? "-"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {group.subcriptionExpiration
                    ? new Date(group.subcriptionExpiration).toLocaleDateString()
                    : "-"}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/groups/${group.id}`);
                          }}
                        >
                          <Edit className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteOne(group.id)}
                        >
                          <Trash className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        variant="default"
        size="icon-lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary text-primary-foreground"
        onClick={handleAdd}
      >
        <Plus className="size-5" />
      </Button>
    </div>
  );
}
