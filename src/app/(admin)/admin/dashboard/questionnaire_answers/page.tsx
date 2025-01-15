"use client";

import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { Button } from "@/components/ui/button";
import { useGetQuestionnaireAnswers } from "@/lib/hooks/useQuestionnaireAnswer";
import QuestionnaireAnswerTable from "./_components/questionnnaire-answer-table";

export default function AdminQuestionnaireAnswersPage() {
  const { data: questionnaireAnswers, refetch: refetchQuestionnaireAnswers } = useGetQuestionnaireAnswers();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/questionnaire_answers", label: "Home" },
            { label: "Questionnaire Answers [working on progress]" },
          ]}
        />
        <Button variant={"default"}>
          Add Questionnaire Answers
        </Button>
      </div>
      <QuestionnaireAnswerTable
        questionnaireAnswer={questionnaireAnswers}
        refetchQuestionnaireAnswer={refetchQuestionnaireAnswers}
      />
    </div>
  )
}