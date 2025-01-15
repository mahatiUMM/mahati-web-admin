import { z } from "zod";
import { useEffect } from "react";
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
import { usePutQuestionnaire } from "@/lib/hooks/useQuestionnaire";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuestionnaireFormEdit({
  questionnaire,
  refetchQuestionnaire,
  closeDialog,
}: Readonly<{
  questionnaire: any;
  refetchQuestionnaire: () => void;
  closeDialog: () => void;
}>) {
  const { putData: updateQuestionnaire } = usePutQuestionnaire();

  const formSchema = z.object({
    type: z.string().min(1).max(300),
    image: z.any().optional(),
    title: z.string().min(5).max(300),
    description: z.string().min(5).max(300),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      image: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (questionnaire) {
      form.setValue("type", questionnaire?.data?.type.toString());
      form.setValue("title", questionnaire?.data?.title);
      form.setValue("description", questionnaire?.data?.description);
    }
  }, [questionnaire, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('type', values.type);
    if (values.image) {
      formData.append('image', values.image[0]);
    }
    formData.append('title', values.title);
    formData.append('description', values.description);

    await updateQuestionnaire(questionnaire?.data?.id, formData);
    refetchQuestionnaire();
    closeDialog();
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Type" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
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
  )
}