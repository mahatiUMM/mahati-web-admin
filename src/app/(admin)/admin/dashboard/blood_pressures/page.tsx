"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useGetBloodPressures } from "@/lib/hooks/useBloodPressures"
import { useGetAllUsers } from "@/lib/hooks/useUsers";
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { CustomDialog } from "@/components/layout/custom-dialog"
import BloodPressureTable from "./components/blood-pressure-table"
import BloodPressureForm from "./components/blood-pressure-form"

export default function AdminPressuresPage() {
  const { data: users } = useGetAllUsers();
  const { data: pressures, refetch: refetchPressure } = useGetBloodPressures()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Blood Pressures" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Blood Pressure
        </Button>
      </div>
      <BloodPressureTable pressures={pressures?.data} refetchPressure={refetchPressure} />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Blood Pressure"
        description="Enter the details for the new blood pressure entry."
      >
        <BloodPressureForm
          fetchUsers={users?.data}
          closeDialog={handleDialogClose}
          refetchPressure={refetchPressure}
        />
      </CustomDialog>
    </div>
  )
}