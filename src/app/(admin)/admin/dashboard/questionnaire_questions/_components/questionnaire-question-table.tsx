import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info, Trash } from "lucide-react";

interface AvailableAnswer {
  id: number;
  answer_text: string;
  created_at: string;
  updated_at: string | null;
}

interface QuestionnaireHistories {
  id: number;
  question_id: number;
  answer: number;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}

interface Questionnaire {
  id: number;
  type: number;
  image: string | null;
  title: string;
  description: string;
  created_at: string;
  updated_at: string | null;
}

interface QuestionnaireQuestion {
  id: number;
  questionnaire_id: number;
  question: string;
  created_at: string;
  updated_at: string | null;
  questionnaire: Questionnaire;
  questionnaire_histories: QuestionnaireHistories[];
  available_answers: AvailableAnswer[];
}

interface QuestionnaireQuestionProps {
  data: QuestionnaireQuestion[];
}

export default function QuestionnaireQuestionTable({
  questionnaireQuestions,
  refetchQuestionnaireQuestions,
}: Readonly<{
  questionnaireQuestions: QuestionnaireQuestionProps;
  refetchQuestionnaireQuestions: () => void;
}>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Questionnaire</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questionnaireQuestions?.data.map((questionnaireQuestion) => (
          <TableRow key={questionnaireQuestion.id}>
            <TableCell>{questionnaireQuestion.id}</TableCell>
            <TableCell>{questionnaireQuestion.question}</TableCell>
            <TableCell>{questionnaireQuestion.questionnaire.title}</TableCell>
            <TableCell>{questionnaireQuestion.created_at}</TableCell>
            <TableCell>{questionnaireQuestion.updated_at}</TableCell>
            <TableCell className="min-[800px]:space-x-2 max-[800px]:space-y-2">
              <Button
                className="rounded-full p-1 size-8"
                variant={"outline"}
              // onClick={() => handleEditClick(brochure.id)}
              >
                <Info className="text-blue-600 dark:text-blue-400 size-6" />
              </Button>
              <Button
                className="rounded-full p-1 size-8"
                variant={"outline"}
              // onClick={() => handleDeleteClick(brochure.id)}
              >
                <Trash className="text-red-600 dark:text-red-400 size-6" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
