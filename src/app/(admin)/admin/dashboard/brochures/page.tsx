"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import {
  useGetBrochures,
  usePostBrochure,
} from "@/lib/hooks/useBrochure"
import BrochureTable from "./components/brochure-table"
import { CustomDialog } from "@/components/layout/custom-dialog"
import BrochureForm from "./components/brochure-form"

export default function AdminBrochuresPage() {
  const { data: brochures, refetch: refetchBrochure } = useGetBrochures();
  const { mutate: postBrochure } = usePostBrochure();

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
      title: e.target.title.value,
      image: e.target.image.value,
    }
    await postBrochure(formData);
    refetchBrochure();
    handleDialogClose();
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
        <BrochureForm onSubmit={handleSubmit} onCancel={handleDialogClose} />
      </CustomDialog>
    </div>
  )
}