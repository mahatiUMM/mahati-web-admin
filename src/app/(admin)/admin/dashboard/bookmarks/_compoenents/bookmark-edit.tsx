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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePutBookmark } from "@/lib/hooks/useBookmarks";

export default function BookmarkFormEdit({
  bookmark,
  refetchBookmark,
  fetchUsers,
  fetchVideos,
  closeDialog,
}: Readonly<{
  bookmark: any,
  fetchUsers: any,
  fetchVideos: any,
  refetchBookmark: () => void,
  closeDialog: () => void,
}>) {
  const { putData: updateBookmark } = usePutBookmark();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<string>("");

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

  useEffect(() => {
    if (bookmark) {
      form.setValue("user_id", bookmark?.data?.user_id.toString());
      form.setValue("video_id", bookmark?.data?.video_id.toString());
      setSelectedUser(bookmark?.data?.user_id.toString());
      setSelectedVideo(bookmark?.data?.video_id.toString());
    }
  }, [bookmark, form]);

  const handleUserSelect = (value: string) => {
    form.setValue("user_id", value);
    setSelectedUser(value);
  };

  const handleVideoSelect = (value: string) => {
    form.setValue("video_id", value);
    setSelectedVideo(value);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateBookmark(bookmark?.data?.id, values);
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
                  onValueChange={handleUserSelect}
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
              <FormLabel>Select Video</FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleVideoSelect}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a video">
                      {fetchVideos?.find((video: any) => video.id.toString() === selectedVideo)?.title || "Select a video"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {fetchVideos?.map((video: any) => (
                      <SelectItem key={video.id} value={video.id.toString()}>
                        {video.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
