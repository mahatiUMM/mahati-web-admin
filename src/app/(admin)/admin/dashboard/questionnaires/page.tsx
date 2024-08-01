"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import {
  useGetQuestionnaires,
  usePostQuestionnaire,
} from "@/lib/hooks/useQuestionnaire"
import QuestionnaireTable from "./components/questionnaire-table"

export default function AdminQuestionnairesPage() {
  const { data: questionnaires, refetch: refetchQuestionnare } = useGetQuestionnaires();
  const { mutate: postQuestionnaire } = usePostQuestionnaire();

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
      type: e.target.type.value,
      image: e.target.image.value,
      title: e.target.title.value,
      description: e.target.description.value,
    }
    await postQuestionnaire(formData);
    handleDialogClose();
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
        <Button variant={"default"}>
          Add Questionnaire
        </Button>
      </div>
      <QuestionnaireTable questionnaires={questionnaires?.data} refetchQuestionnare={refetchQuestionnare} />
    </div>
  )
}