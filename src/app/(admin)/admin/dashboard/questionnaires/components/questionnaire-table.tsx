import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomAlert } from "@/components/layout/custom-alert";
import {
  Info,
  Trash,
  Plus,
} from "lucide-react";
import { CustomDialog } from "@/components/layout/custom-dialog";
import {
  useGetQuestionnaireById,
  useDeleteQuestionnaire,
} from "@/lib/hooks/useQuestionnaire";
import QuestionnaireFormEdit from "./questionnaire-edit";
import QuestionnaireQuestion from "./questionnaire-question";

export default function QuestionnaireTable({
  questionnaires,
  refetchQuestionnare,
}: Readonly<{
  questionnaires: {
    id: number,
    type: string,
    image: string,
    title: string,
    description: string,
    questionnaire_questions: {
      id?: number;
      questionnaire_id?: number;
      question: string;
      created_at?: string;
      updated_at?: string;
      available_answers?: {
        id?: number;
        questionnaireQuestionId?: number;
        answer_text: string;
        created_at: string;
        updated_at: string | null;
      }[];
    }[];
  }[];
  refetchQuestionnare: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestionnaireAdd, setSelectedQuestionnaireAdd] = useState<number | null>(null);
  const [selectedQuestionnaireEdit, setSelectedQuestionnaireEdit] = useState<number | null>(null);
  const [selectedQuestionnaireDelete, setSelectedQuestionnaireDelete] = useState<number | null>(null);

  const { data: questionnaire, fetchData } = useGetQuestionnaireById();
  const { deleteData: deleteQuestionnaire } = useDeleteQuestionnaire();

  const handleAddClick = (id: number) => {
    setSelectedQuestionnaireAdd(id);
    fetchData(id);
    setDialogOpen(true);
  }

  const handleEditClick = (id: number) => {
    setSelectedQuestionnaireEdit(id);
    fetchData(id);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedQuestionnaireDelete(id);
    setIsDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setSelectedQuestionnaireAdd(null);
    setDialogOpen(false);
  }

  const handleEditDialogClose = () => {
    setSelectedQuestionnaireEdit(null);
    setDialogOpen(false);
  }

  const handleDeleteDialogClose = () => {
    setSelectedQuestionnaireDelete(null);
    setIsDialogOpen(false);
  }

  const handleDeleteQuestionnaire = async () => {
    if (selectedQuestionnaireDelete) {
      await deleteQuestionnaire(selectedQuestionnaireDelete);
      refetchQuestionnare();
      handleDeleteDialogClose();
    }
  }

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questionnaires?.map((questionnaire) => (
            <TableRow key={questionnaire.id}>
              <TableCell>{questionnaire.id}</TableCell>
              <TableCell>{questionnaire.type}</TableCell>
              <TableCell>{questionnaire.title}</TableCell>
              <TableCell>
                <Link href={questionnaire?.image ?? "/no-image.jpg"} target="_blank">
                  <Image
                    src={questionnaire.image ?? "/no-image.jpg"}
                    loading="lazy"
                    crossOrigin="anonymous"
                    width={500}
                    height={500}
                    alt={questionnaire.title}
                    className="rounded-sm"
                  />
                </Link>
              </TableCell>
              <TableCell>{questionnaire.description}</TableCell>
              <TableCell>
                <div className="space-y-2">
                  {questionnaire?.questionnaire_questions?.map((question) => (
                    <div key={question.id} className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Q:</span>
                        <p className="text-red-600 dark:text-red-400">{question.question}</p>
                      </div>
                      <div>
                        <span className="font-bold">A:</span>
                        {question?.available_answers?.map((answer) => (
                          <li key={answer.id} className="text-green-600 dark:text-green-400">
                            {answer.answer_text}
                          </li>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2 align-middle">
                  <Button
                    className="rounded-full p-1 size-8"
                    variant={"outline"}
                    onClick={() => handleEditClick(questionnaire.id)}
                  >
                    <Info className="text-blue-400 size-6" />
                  </Button>
                  <Button
                    className="rounded-full p-1 size-8"
                    variant={"outline"}
                    onClick={() => handleAddClick(questionnaire.id)}
                  >
                    <Plus className="text-green-400 size-6" />
                  </Button>
                  <Button
                    className="rounded-full p-1 size-8"
                    variant={"outline"}
                    onClick={() => handleDeleteClick(questionnaire.id)}
                  >
                    <Trash className="text-red-400 size-6" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedQuestionnaireEdit && questionnaire && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title={`Edit Questionnaire ID: ${selectedQuestionnaireEdit}`}
          description="Update the details for the selected questionnaire."
        >
          <QuestionnaireFormEdit
            questionnaire={questionnaire}
            refetchQuestionnaire={refetchQuestionnare}
            closeDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      {selectedQuestionnaireAdd && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleAddDialogClose}
          title="Add Questionnaire"
          description="Enter the details for the new questionnaire entry."
        >
          <QuestionnaireQuestion
            questionnaire={questionnaire}
            refetchQuestionnaire={refetchQuestionnare}
            closeDialog={handleAddDialogClose}
          />
        </CustomDialog>
      )}
      <CustomAlert
        open={isDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        onClick={handleDeleteQuestionnaire}
        title={`Delete Questionnaire ID: ${selectedQuestionnaireDelete}`}
        description="Are you sure you want to delete this questionnaire entry?"
      />
    </>
  );
}