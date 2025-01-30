"use client";

import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { useGetQuestionnaireHistories } from "@/lib/hooks/useQuestionnaireHistories";
import QuestionnaireAnswerTable from "./_components/questionnnaire-histories-table";

export default function AdminQuestionnaireHistoriesPage() {
  const { data: questionnaireHistories, refetch: refetchQuestionnaireHistories } = useGetQuestionnaireHistories();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Questionnaire Histories" },
          ]}
        />
      </div>
      <QuestionnaireAnswerTable
        questionnaireHistory={questionnaireHistories}
        refetchQuestionnaireHistory={refetchQuestionnaireHistories}
      />
    </div>
  )
}