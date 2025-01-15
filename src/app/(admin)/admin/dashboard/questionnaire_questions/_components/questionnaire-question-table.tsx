import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AvailableAnswer {
  id: number;
  answer_text: string;
  created_at: string;
  updated_at: string | null;
}

interface QuestionnaireAnswer {
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
  questionnaire_answers: QuestionnaireAnswer[];
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
