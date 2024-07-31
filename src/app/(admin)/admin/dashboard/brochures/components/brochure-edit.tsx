import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrochureFormEdit({
  brochure,
  onSubmit,
  onCancel,
}: Readonly<{
  brochure: any,
  onSubmit: (data: any) => void;
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
        <Button type="button" variant={"outline"} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}