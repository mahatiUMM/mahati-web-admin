import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { Button } from "@/components/ui/button";

export default function AdminQuestionnaireAnswersPage() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/questionnaire_answers", label: "Home" },
            { label: "Questionnaire Answers" },
          ]}
        />
        <Button variant={"default"}>
          Add Questionnaire Answers
        </Button>
      </div>
    </div>
  )
}