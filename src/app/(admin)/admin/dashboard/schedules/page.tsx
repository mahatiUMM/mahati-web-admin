"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import {
  useGetSchedules,
  usePostSchedule,
} from "@/lib/hooks/useSchedule"
import ScheduleTable from "./components/schedule-table"
import ScheduleForm from "./components/schedule-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminSchedulesPage() {
  const { data: schedules, refetch: refetchSchedule } = useGetSchedules();
  const { mutate: postSchedule } = usePostSchedule();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      reminder_id: e.target.reminder_id.value,
      time: e.target.time.value,
      status: e.target.status.value,
    }
    await postSchedule(formData);
    refetchSchedule();
    handleDialogClose();
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
        <ScheduleForm onSubmit={handleSubmit} onCancel={handleDialogClose} />
      </CustomDialog>
    </div>
  )
}