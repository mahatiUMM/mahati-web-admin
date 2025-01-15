"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetBrochures } from "@/lib/hooks/useBrochure"
import BrochureTable from "./_components/brochure-table"
import { CustomDialog } from "@/components/layout/custom-dialog"
import BrochureForm from "./_components/brochure-form"

export default function AdminBrochuresPage() {
  const { data: brochures, refetch: refetchBrochure } = useGetBrochures();

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
            { label: "Brochures" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Brochure
        </Button>
      </div>
      <BrochureTable brochures={brochures?.data} refetchBrochure={refetchBrochure} />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Brochure"
        description="Enter the details for the new brochure entry."
      >
        <BrochureForm
          refetchBrochure={refetchBrochure}
          closeDialog={handleDialogClose}
        />
      </CustomDialog>
    </div>
  )
}