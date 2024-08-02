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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Info, Trash } from "lucide-react";
import { CustomDialog } from "@/components/layout/custom-dialog";
import {
  useGetQuestionnaireById,
  usePutQuestionnaire,
  useDeleteQuestionnaire,
} from "@/lib/hooks/useQuestionnaire";
import QuestionnaireEdit from "./questionnaire-edit";

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
  const [selectedQuestionnaireEdit, setSelectedQuestionnaireEdit] = useState<number | null>(null);
  const [selectedQuestionnaireDelete, setSelectedQuestionnaireDelete] = useState<number | null>(null);

  const { data: questionnaire, fetchData } = useGetQuestionnaireById();
  const { putData: updateQuestionnaire } = usePutQuestionnaire();
  const { deleteData: deleteQuestionnaire } = useDeleteQuestionnaire();

  const handleEditClick = (id: number) => {
    setSelectedQuestionnaireEdit(id);
    fetchData(id);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedQuestionnaireDelete(id);
    setIsDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedQuestionnaireEdit(null);
    setDialogOpen(false);
  }

  const handleDeleteDialogClose = () => {
    setSelectedQuestionnaireDelete(null);
    setIsDialogOpen(false);
  }

  const handlePutQuestionnaire = async (formData: any) => {
    if (selectedQuestionnaireEdit) {
      await updateQuestionnaire(selectedQuestionnaireEdit, formData);
      refetchQuestionnare();
      handleEditDialogClose();
    }
  }

  const handleDeleteQuestionnaire = async () => {
    if (selectedQuestionnaireDelete) {
      await deleteQuestionnaire(selectedQuestionnaireDelete);
      refetchQuestionnare();
      handleDeleteDialogClose();
    }
  }

  console.log(questionnaires)

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
                <Link href={questionnaire.image} target="_blank">
                  <Image
                    src={questionnaire.image}
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
                {questionnaire?.questionnaire_questions?.map((question) => (
                  <div key={question.id}>
                    <p className="text-red-300">
                      Q: {question.question
                      }</p>
                    <ul>
                      {question?.available_answers?.map((answer) => (
                        <li key={answer.id} className="text-green-300">
                          {answer.answer_text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </TableCell>
              <TableCell className="flex items-center space-x-2">
                <Button
                  className="rounded-full px-1 py-1"
                  variant={"outline"}
                  onClick={() => handleEditClick(questionnaire.id)}
                >
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button
                  className="rounded-full px-1 py-1"
                  variant={"outline"}
                  onClick={() => handleDeleteClick(questionnaire.id)}
                >
                  <Trash className="text-red-400 h-5 w-5" />

                </Button>
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
          <QuestionnaireEdit
            questionnaire={questionnaire}
            onSubmit={handlePutQuestionnaire}
            onCancel={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Info size={24} />
            <AlertDialogTitle>
              {selectedQuestionnaireDelete && `Delete Questionnaire ID: ${selectedQuestionnaireDelete}`}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this questionnaire?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteQuestionnaire}>
              <Trash size={24} />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}