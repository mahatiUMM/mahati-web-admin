import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VideoFormEdit({
  video,
  onSubmit,
  onCancel,
}: Readonly<{
  video: any,
  onSubmit: (data: any) => void;
  onCancel: () => void;
}>) {
  const [formData, setFormData] = useState({
    user_id: "",
    link: "",
  })

  useEffect(() => {
    if (video) {
      setFormData({
        user_id: video?.data?.user_id,
        link: video?.data?.link,
      });
    }
  }, [video]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label htmlFor="user_id">User ID</Label>
      <Input
        id="user_id"
        name="user_id"
        type="text"
        value={formData.user_id}
        onChange={handleChange}
        placeholder="User ID"
      />

      <Label htmlFor="link">Link</Label>
      <Input
        id="link"
        name="link"
        type="text"
        value={formData.link}
        onChange={handleChange}
        placeholder="Link"
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