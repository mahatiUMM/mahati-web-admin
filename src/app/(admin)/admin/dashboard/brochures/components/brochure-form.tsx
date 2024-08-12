import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BrochureForm({
  onSubmit,
  onCancel
}: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" placeholder="Title" />
      <Label htmlFor="image">Image</Label>
      <Input id="image" name="image" placeholder="Image" />
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