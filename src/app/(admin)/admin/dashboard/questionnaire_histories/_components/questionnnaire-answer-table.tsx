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

interface QuestionnaireHistory {
  id: number;
  question_id: number;
  answer: number;
  user_id: number;
  created_at: string;
  updated_at: string | null;
  user: User;
  question: Question;
  selectedAnswer: string;
}

interface QuestionnaireHistoryTableProps {
  data: QuestionnaireHistory[];
}

export default function QuestionnaireHistoryTable({
  questionnaireHistory,
  refetchQuestionnaireHistory,
}: Readonly<{
  questionnaireHistory: QuestionnaireHistoryTableProps;
  refetchQuestionnaireHistory: () => void;
}>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Answer</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questionnaireHistory?.data.map((answer) => (
          <TableRow key={answer.id}>
            <TableCell>{answer.user.username}</TableCell>
            <TableCell>{answer.question.question}</TableCell>
            <TableCell>{answer.selectedAnswer}</TableCell>
            <TableCell>{new Date(answer.created_at).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
