"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  useGetBloodPressures,
  usePostBloodPressure,
} from "@/lib/hooks/useBloodPressures"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { CustomDialog } from "@/components/layout/custom-dialog"
import BloodPressureTable from "./components/blood-pressure-table"
import BloodPressureForm from "./components/blood-pressure-form"

export default function AdminPressuresPage() {
  const { data: pressures, refetch: refetchPressure } = useGetBloodPressures()
  const { mutate: postBloodPressure } = usePostBloodPressure();

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = {
      user_id: parseInt(e.target.user_id.value),
      image: e.target.image.value,
      sistol: parseInt(e.target.sistol.value),
      diastole: parseInt(e.target.diastole.value),
      heartbeat: parseInt(e.target.heartbeat.value),
    }
    await postBloodPressure(formData)
    refetchPressure()
    handleDialogClose()
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
        <BloodPressureForm onSubmit={handleSubmit} onCancel={handleDialogClose} />
      </CustomDialog>
    </div>
  )
}