import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function VideoForm({
  onSubmit,
  onCancel,
}: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="user_id">User ID</Label>
      <Input id="user_id" name="user_id" placeholder="User ID" />
      <Label htmlFor="link">Link</Label>
      <Input id="link" name="link" placeholder="Link" />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" variant={"default"}>
          Save
        </Button>
        <Button variant={"outline"} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}