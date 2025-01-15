"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetReminders } from "@/lib/hooks/useReminder"
import { useGetAllUsers } from "@/lib/hooks/useUsers";
import ReminderTable from "./_components/reminder-table"
import ReminderForm from "./_components/reminder-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminRemindersPage() {
  const { data: users } = useGetAllUsers();
  const { data: reminders, refetch: refetchReminder } = useGetReminders();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Reminders" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Reminder
        </Button>
      </div>
      <ReminderTable
        reminders={reminders?.data}
        fetchUsers={users?.data}
        refetchReminder={refetchReminder}
      />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Reminder"
        description="Enter the details for the new reminder entry."
      >
        <ReminderForm
          fetchUsers={users?.data}
          refetchReminder={refetchReminder}
          closeDialog={handleDialogClose}
        />
      </CustomDialog>
    </div>
  )
}