import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuestionnaireEdit({
  questionnaire,
  onSubmit,
  onCancel,
}: Readonly<{
  questionnaire: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}>) {
  const [formData, setFormData] = useState({
    type: "",
    image: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (questionnaire) {
      setFormData({
        type: questionnaire?.data?.type,
        image: questionnaire?.data?.image,
        title: questionnaire?.data?.title,
        description: questionnaire?.data?.description,
      });
    }
  }, [questionnaire]);

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
      <Label htmlFor="type">Type</Label>
      <Input
        id="type"
        name="type"
        type="text"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
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

      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />

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