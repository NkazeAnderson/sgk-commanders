"use client";

import GroupsTable from "@/components/groups/GroupsTable";

export default function GroupsPage() {
  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-4 overflow-x-auto">
      <GroupsTable />
    </div>
  );
}
