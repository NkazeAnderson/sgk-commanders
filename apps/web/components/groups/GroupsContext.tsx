"use client";

import React from "react";
import type { groupT } from "sgk-commanders-shared";
import { supabase } from "sgk-commanders-shared";

type GroupsContextValue = {
  groups: groupT[];
  loading: boolean;
  refresh: () => Promise<void>;
  addGroup: (group: groupT) => Promise<groupT | null>;
  updateGroup: (id: string, data: Partial<groupT>) => Promise<groupT | null>;
  deleteGroup: (id: string) => Promise<boolean>;
};

const GroupsContext = React.createContext<GroupsContextValue | undefined>(
  undefined
);

export function useGroups() {
  const ctx = React.useContext(GroupsContext);
  if (!ctx) throw new Error("useGroups must be used within GroupsProvider");
  return ctx;
}

export function GroupsProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: groupT[];
}) {
  const [groups, setGroups] = React.useState<groupT[]>(initialData ?? []);
  const [loading, setLoading] = React.useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await supabase.groups.getGroups();
      setGroups(res ?? []);
      console.log("members", await supabase.groups.getGroupMembers());
    } catch (err) {
      console.error("Failed to refresh groups:", err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (initialData && initialData.length) {
      setGroups(initialData);
      return;
    }
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addGroup(group: groupT) {
    // optimistic update
    setGroups((s) => [group, ...s]);
    try {
      const createdRes = await supabase.groups.createGroup(group as any);
      // if createGroup returns the record, replace optimistic entry
      if ((createdRes as any)?.data) {
        const created = (createdRes as any).data;
        setGroups((s) => [created, ...s.filter((g) => g.id !== created.id)]);
        return created as groupT;
      }
      // fallback: refresh
      await refresh();
      return null;
    } catch (err) {
      console.error("Failed to add group:", err);
      // revert
      setGroups((s) => s.filter((g) => g.id !== group.id));
      return null;
    }
  }

  async function updateGroup(id: string, data: Partial<groupT>) {
    const prev = groups;
    setGroups((s) => s.map((g) => (g.id === id ? { ...g, ...data } : g)));
    try {
      const updatedRes = await supabase.groups.editGroup({
        id,
        ...data,
      } as any);
      // if API returns updated row in data
      if ((updatedRes as any)?.data) {
        const updated = (updatedRes as any).data;
        setGroups((s) => s.map((g) => (g.id === id ? updated : g)));
        return updated as groupT;
      }
      // fallback: refresh
      await refresh();
      return null;
    } catch (err) {
      console.error("Failed to update group:", err);
      setGroups(prev);
      return null;
    }
  }

  async function deleteGroup(id: string) {
    const prev = groups;
    setGroups((s) => s.filter((g) => g.id !== id));
    try {
      await supabase.groups.deleteGroup({ id } as any);
      return true;
    } catch (err) {
      console.error("Failed to delete group:", err);
      setGroups(prev);
      return false;
    }
  }

  return (
    <GroupsContext.Provider
      value={{ groups, loading, refresh, addGroup, updateGroup, deleteGroup }}
    >
      {children}
    </GroupsContext.Provider>
  );
}
