"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BookmarkForm({ onSubmit, onCancel }: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="user_id">User ID</Label>
      <Input id="user_id" name="user_id" placeholder="User ID" />
      {/* <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select> */}
      <Label htmlFor="video_id">Video ID</Label>
      <Input id="video_id" name="video_id" placeholder="Video ID" />
      <Label htmlFor="is_bookmark">Is Bookmark</Label>
      <Input id="is_bookmark" name="is_bookmark" placeholder="Is Bookmark?" />
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