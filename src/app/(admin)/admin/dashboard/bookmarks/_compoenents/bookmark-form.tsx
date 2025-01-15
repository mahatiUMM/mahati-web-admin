import { useState } from "react";
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
  fetchVideos,
  refetchBookmark,
  closeDialog
}: Readonly<{
  fetchUsers: any;
  fetchVideos: any;
  refetchBookmark: () => void;
  closeDialog: () => void;
}>) {
  const { mutate: postBookmark } = usePostBookmark();
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

  const handleSelectUser = (value: string) => {
    form.setValue("user_id", value);
    setSelectedUser(value);
  };

  const handleSelectVideo = (value: string) => {
    form.setValue("video_id", value);
    setSelectedVideo(value);
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
                  onValueChange={handleSelectUser}
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
                  onValueChange={handleSelectVideo}
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
  )
}