import { z } from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  usePutQuestionnaireAnswer,
  useDeleteQuestionnaireAnswer
} from "@/lib/hooks/useQuestionnaireAnswer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomAlert } from "@/components/layout/custom-alert";

export default function QuestionnaireAnswerAction({
  selectedAnswer,
  refetchAvailableAnswer,
  closdDialog
}: Readonly<{
  selectedAnswer: { id: number | null, answer_text: string }
  refetchAvailableAnswer: () => void;
  closdDialog: () => void;
}>) {
  const { putAnswer: putQuestionnaireAnswer } = usePutQuestionnaireAnswer();
  const { deleteAnswer: deleteQuestionnaireAnswer } = useDeleteQuestionnaireAnswer();

  const formSchema = z.object({
    answer_text: z.string().min(1).max(300),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer_text: "",
    },
  });

  useEffect(() => {
    if (selectedAnswer) {
      form.setValue("answer_text", selectedAnswer.answer_text);
    }
  }, [form, selectedAnswer]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (selectedAnswer && selectedAnswer.id !== null) {
      await putQuestionnaireAnswer(selectedAnswer.id, values);
      refetchAvailableAnswer();
      closdDialog();
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleteDialogOpen(true);
  }

  const handleDeleteAnswer = async () => {
    if (selectedAnswer) {
      if (selectedAnswer.id !== null) {
        await deleteQuestionnaireAnswer(selectedAnswer.id);
        refetchAvailableAnswer();
        handleDeleteDialogClose();
        closdDialog();
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="answer_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="answer_text">Answer Text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="answer_text"
                    type="text"
                    placeholder="Enter answer text"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.answer_text?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button variant="destructive" onClick={handleDeleteClick} type="button">
              Delete
            </Button>
            <Button type="submit">
              Save
            </Button>
            <Button variant="outline" onClick={closdDialog} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <CustomAlert
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        onClick={handleDeleteAnswer}
        title={`Delete Answer ${selectedAnswer.answer_text}`}
        description="Are you sure you want to delete this answer?"
      />
    </>
  )
}