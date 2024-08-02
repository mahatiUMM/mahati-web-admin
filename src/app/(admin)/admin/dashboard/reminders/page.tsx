"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import {
  useGetReminders,
  usePostReminder,
} from "@/lib/hooks/useReminder"
import ReminderTable from "./components/reminder-table"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminRemindersPage() {
  const { data: reminders, refetch: refetchReminder } = useGetReminders();
  const { mutate: postReminder } = usePostReminder();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Reminders" },
          ]}
        />
        <Button variant={"default"}>
          Add Reminder
        </Button>
      </div>
      <ReminderTable reminders={reminders?.data} refetchReminder={refetchReminder} />
    </div>
  )
}