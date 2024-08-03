"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import {
  useGetReminders,
  usePostReminder,
} from "@/lib/hooks/useReminder"
import ReminderTable from "./components/reminder-table"
import ReminderForm from "./components/reminder-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminRemindersPage() {
  const { data: reminders, refetch: refetchReminder } = useGetReminders();
  const { mutate: postReminder } = usePostReminder();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      user_id: Number(e.target.user_id.value),
      medicine_name: e.target.medicine_name.value,
      medicine_taken: Number(e.target.medicine_taken.value),
      medicine_total: Number(e.target.amount.value - e.target.medicine_taken.value),
      amount: Number(e.target.amount.value),
      cause: e.target.cause.value,
      cap_size: Number(e.target.cap_size.value),
      medicine_time: e.target.medicine_time.value,
      expired_at: new Date(e.target.expired_at.value),
    };
    await postReminder(payload);
    refetchReminder();
    handleDialogClose();
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
      <ReminderTable reminders={reminders?.data} refetchReminder={refetchReminder} />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Reminder"
        description="Enter the details for the new reminder entry."
      >
        <ReminderForm onSubmit={handleSubmit} onCancel={handleDialogClose} />
      </CustomDialog>
    </div>
  )
}