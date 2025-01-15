import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AvailableAnswer {
  answer_text: string;
}

interface Question {
  id: number;
  questionnaire_id: number;
  question: string;
  created_at: string;
  updated_at: string | null;
  available_answers: AvailableAnswer[];
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  number: string;
  photo: string;
  isAdmin: boolean;
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
  user: User;
  question: Question;
}

interface QuestionnaireAnswerTableProps {
  data: QuestionnaireAnswer[];
}

export default function QuestionnaireAnswerTable({
  questionnaireAnswer,
  refetchQuestionnaireAnswer,
}: Readonly<{
  questionnaireAnswer: QuestionnaireAnswerTableProps;
  refetchQuestionnaireAnswer: () => void;
}>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Question</TableCell>
          <TableCell>Answer</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questionnaireAnswer?.data.map((answer) => (
          <TableRow key={answer.id}>
            <TableCell>{answer.user.username}</TableCell>
            <TableCell>{answer.question.question}</TableCell>
            <TableCell>{answer.question.available_answers[answer.answer - 1]?.answer_text}</TableCell>
            <TableCell>{new Date(answer.created_at).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
