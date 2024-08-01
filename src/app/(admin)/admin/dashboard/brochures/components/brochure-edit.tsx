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
  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });

  useEffect(() => {
    if (brochure) {
      setFormData({
        title: brochure?.data?.title,
        image: brochure?.data?.image,
      });
    }
  }, [brochure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <Label htmlFor="image">Image</Label>
      <Input
        id="image"
        name="image"
        type="text"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image"
      />

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