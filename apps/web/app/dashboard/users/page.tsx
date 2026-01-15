"use client"

import UsersTable from "@/components/users/UsersTable"

export default function UsersPage() {
  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-4 overflow-x-auto">
      <UsersTable />
    </div>
  )
}

