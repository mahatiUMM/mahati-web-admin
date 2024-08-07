"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetAllUsers } from "@/lib/hooks/useUsers"
import UsersTable from "./components/user-table"

export default function AdminUsersPage() {
  const { data: users, refetch: refetchUsers } = useGetAllUsers();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Users" },
          ]}
        />
        <Button variant={"default"}>
          Add User
        </Button>
      </div>
      <UsersTable users={users?.data} refetchUsers={refetchUsers} />
    </div>
  )
}