"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { useGetQuestionnaires } from "@/lib/hooks/useQuestionnaire"
import QuestionnaireTable from "./_components/questionnaire-table"
import QuestionnaireForm from "./_components/quesstionnaire-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminQuestionnairesPage() {
  const { data: questionnaires, refetch: refetchQuestionnare } = useGetQuestionnaires();

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
            { label: "Questionnaires" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Questionnaire
        </Button>
      </div>
      <QuestionnaireTable
        questionnaires={questionnaires?.data}
        refetchQuestionnare={refetchQuestionnare}
      />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Questionnaire"
        description="Enter the details for the new questionnaire entry."
      >
        <QuestionnaireForm
          refetchQuestionnaire={refetchQuestionnare}
          closeDialog={handleDialogClose}
        />
      </CustomDialog>
    </div>
  )
}