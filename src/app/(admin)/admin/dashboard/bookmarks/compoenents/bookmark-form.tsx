import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePostBookmark } from "@/lib/hooks/useBookmarks";
import { z } from "zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BookmarkForm({
  fetchUsers,
  refetchBookmark,
  closeDialog
}: Readonly<{
  fetchUsers: any;
  refetchBookmark: () => void;
  closeDialog: () => void;
}>) {
  const { mutate: postBookmark } = usePostBookmark();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const formSchema = z.object({
    user_id: z.string().min(1).max(300),
    video_id: z.string().min(1).max(300),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      video_id: "",
    },
  });

  const handleSelectChange = (value: string) => {
    form.setValue("user_id", value);
    setSelectedUser(value);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await postBookmark(values);
    refetchBookmark();
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select User</FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleSelectChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a user">
                      {fetchUsers?.find((user: any) => user.id.toString() === selectedUser)?.username || "Select a user"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {fetchUsers?.map((user: any) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video ID</FormLabel>
              <FormControl>
                <Input
                  id="video_id"
                  name="video_id"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Video ID"
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
  )
}