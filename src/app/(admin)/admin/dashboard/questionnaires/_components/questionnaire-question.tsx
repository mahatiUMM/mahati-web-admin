import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostQuestionnaireQuestion } from "@/lib/hooks/useQuestionnaireQuestion";

export default function QuestionnaireQuestion({
  questionnaire,
  refetchQuestionnaire,
  closeDialog,
}: Readonly<{
  questionnaire: any;
  refetchQuestionnaire: () => void;
  closeDialog: () => void;
}>) {
  const { mutate: postQuestionnaireQuestion } = usePostQuestionnaireQuestion();

  const formSchema = z.object({
    questionnaire_id: z.string().min(1).max(300),
    question: z.string().min(2).max(300),
    available_answer: z
      .array(
        z.object({
          answer_text: z.string().min(1).max(100),
        })
      ).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionnaire_id: "",
      question: "",
      available_answer: [{ answer_text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "available_answer",
  });

  useEffect(() => {
    if (questionnaire) {
      form.setValue("questionnaire_id", questionnaire?.data?.id.toString());
    }
  }, [questionnaire, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await postQuestionnaireQuestion(values);
    refetchQuestionnaire();
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="questionnaire_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Questionnaire ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Questionnaire ID"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Input your questions"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="available_answer"
          render={() => (
            <FormItem>
              <FormLabel>Available Answers</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder={`Answer ${index + 1}`}
                        {...form.register(
                          `available_answer.${index}.answer_text` as const
                        )}
                      />
                      <Button type="button" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  {fields.length < 4 && (
                    <Button
                      type="button"
                      variant={"default"}
                      onClick={() => append({ answer_text: "" })}
                    >
                      Add Answer
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button type="submit" variant="default">
            Save
          </Button>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
