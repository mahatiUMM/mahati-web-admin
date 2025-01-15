import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { Button } from "@/components/ui/button";

export default function AdminQuestioannireQuestionsPage() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/questionnaire_questions", label: "Home" },
            { label: "Questionnaire Questions" },
          ]}
        />
        <Button variant={"default"}>
          Add Questionnaire Questions
        </Button>
      </div>
    </div>
  )
}