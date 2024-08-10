import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/lib/hooks/useUsers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BookmarkForm({
  onSubmit,
  onCancel
}: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  const { data: users } = useGetAllUsers();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedUser(value);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="user_id">Select User</Label>
      <Select name="user_id" onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a user">
            {users?.data?.find((user: any) => user.id === parseInt(selectedUser))?.username || "Select a user"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users?.data?.map((user: any) => (
            <SelectItem key={user.id} value={user.id}>
              {user.username}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="video_id">Video ID</Label>
      <Input id="video_id" name="video_id" placeholder="Video ID" />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" variant={"default"}>
          Save
        </Button>
        <Button type="button" variant={"outline"} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}