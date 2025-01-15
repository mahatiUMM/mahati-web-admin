"use client";

import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { Button } from "@/components/ui/button";
import QuestionnaireQuestionTable from "./_components/questionnaire-question-table";
import { useGetQuestionnaireQuestions } from "@/lib/hooks/useQuestionnaireQuestion";

export default function AdminQuestioannireQuestionsPage() {
  const { data: questionnaireQuestions, refetch: refetchQuestionnaireQuestions } = useGetQuestionnaireQuestions();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/questionnaire_questions", label: "Home" },
            { label: "Questionnaire Questions [working on progress]" },
          ]}
        />
        <Button variant={"default"}>
          Add Questionnaire Questions
        </Button>
      </div>
      <QuestionnaireQuestionTable
        questionnaireQuestions={questionnaireQuestions}
        refetchQuestionnaireQuestions={refetchQuestionnaireQuestions}
      />
    </div>
  )
}