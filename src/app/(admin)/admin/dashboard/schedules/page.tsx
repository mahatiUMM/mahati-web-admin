"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetSchedules } from "@/lib/hooks/useSchedule"
import { useGetReminders } from "@/lib/hooks/useReminder"
import ScheduleTable from "./components/schedule-table"
import ScheduleForm from "./components/schedule-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminSchedulesPage() {
  const { data: schedules, refetch: refetchSchedule } = useGetSchedules();
  const { data: reminders } = useGetReminders();

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
            { label: "Schedules" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Schedule
        </Button>
      </div>
      <ScheduleTable schedules={schedules?.data} refetchSchedule={refetchSchedule} />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Schedule"
        description="Enter the details for the new schedule entry."
      >
        <ScheduleForm
          fetchReminders={reminders}
          refetchSchedule={refetchSchedule}
          closeDialog={handleDialogClose}
        />
      </CustomDialog>
    </div>
  )
}