import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function QuestionnaireForm({
  onSubmit,
  onCancel
}: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="type">Type</Label>
      <Input id="type" name="type" placeholder="Type" />
      <Label htmlFor="image">Image</Label>
      <Input id="image" name="image" placeholder="Image" />
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" placeholder="Title" />
      <Label htmlFor="description">Description</Label>
      <Input id="description" name="description" placeholder="Description" />
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