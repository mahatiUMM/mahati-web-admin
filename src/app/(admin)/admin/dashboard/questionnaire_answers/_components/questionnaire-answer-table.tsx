import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuestionnaireAnswerAction from "./questionnaire-answer-action";
import { CustomDialog } from "@/components/layout/custom-dialog";

interface AvailableAnswer {
  id: number;
  questionnaireQuestionId: number;
  answer_text: string;
  created_at: string;
  updated_at: string;
}

interface QuestionnaireAnswer {
  id: number;
  question: string;
  questionnaire_id: number;
  created_at: string;
  updated_at: string | null;
  available_answers: AvailableAnswer[];
}

interface QuestionnaireAnswerTableProps {
  data: QuestionnaireAnswer[];
}

export default function QuestionnaireAnswerTable({
  availableAnswer,
  refetchAvailableAnswer,
}: Readonly<{
  availableAnswer: QuestionnaireAnswerTableProps,
  refetchAvailableAnswer: () => void;
}>) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    id: number | null, answer_text: string
  }>({
    id: null, answer_text: ""
  });

  const handleActionClick = (id: number) => {
    setSelectedAnswer({
      id: id,
      answer_text: availableAnswer?.data.find(qa => qa.available_answers.some(aa => aa.id === id))?.available_answers.find(aa => aa.id === id)?.answer_text ?? ""
    })
    setEditDialogOpen(true);
  }

  const handleEditDialogClose = () => {
    setSelectedAnswer({ id: null, answer_text: "" });
    setEditDialogOpen(false);
  }


  const maxAnswers = Math.max(
    ...availableAnswer?.data.map(qa => qa.available_answers.length) || [0]
  );

  const generateAnswerHeaders = () => {
    return Array.from({ length: maxAnswers }, (_, index) => (
      <TableHead key={`answer-${index + 1}`}>Answer {index + 1}</TableHead>
    ));
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            {generateAnswerHeaders()}
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableAnswer?.data.map((questionnaireAnswer) => (
            <TableRow key={questionnaireAnswer.id}>
              <TableCell>{questionnaireAnswer.question}</TableCell>
              {Array.from({ length: maxAnswers }, (_, index) => (
                <TableCell className="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:bg-muted/80" key={`answer-${questionnaireAnswer.id}-${index}`}>
                  {questionnaireAnswer.available_answers[index] && (
                    <button
                      className="flex w-full text-left"
                      onClick={() => handleActionClick(questionnaireAnswer.available_answers[index].id)}
                    >
                      {questionnaireAnswer.available_answers[index].answer_text}
                    </button>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedAnswer && (
        <CustomDialog
          isOpen={editDialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Answer"
          description="Edit the selected answer."
        >
          <QuestionnaireAnswerAction
            selectedAnswer={selectedAnswer}
            refetchAvailableAnswer={refetchAvailableAnswer}
            closdDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
    </>
  )
}