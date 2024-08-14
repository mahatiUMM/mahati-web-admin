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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePutBrochure } from "@/lib/hooks/useBrochure";

export default function BrochureFormEdit({
  brochure,
  refetchBrochure,
  closeDialog,
}: Readonly<{
  brochure: any,
  refetchBrochure: () => void,
  closeDialog: () => void;
}>) {
  const { putData: updateBrochure } = usePutBrochure();

  const formSchema = z.object({
    title: z.string().min(1).max(300),
    images: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      images: [],
    },
  });

  useEffect(() => {
    if (brochure) {
      form.setValue("title", brochure?.data?.title.toString());
      form.setValue("images", brochure?.data?.images || null);
    }
  }, [brochure, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.images) {
      Array.from(values.images).forEach((file: any) => {
        formData.append("images", file);
      });
    }

    await updateBrochure(brochure?.data?.id, formData);
    refetchBrochure();
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <div className="flex space-x-2">
                {brochure?.data?.images?.map((image: any) => (
                  <Image
                    key={image.id}
                    src={`https://mahati.xyzuan.my.id/${image.imagePath}`}
                    alt={brochure?.data?.title}
                    width={100}
                    height={100}
                    className="rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out hover:duration-500 hover:ease-in-out max-w-[100px] max-h-[100px] object-cover my-2"
                  />
                ))}
              </div>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    form.setValue("images", files);
                    field.onChange(files);
                  }}
                />
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
