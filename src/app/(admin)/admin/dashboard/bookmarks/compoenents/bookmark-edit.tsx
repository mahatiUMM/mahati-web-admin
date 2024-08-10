import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookmarkFormEdit({
  bookmark,
  onSubmit,
  onCancel,
}: Readonly<{
  bookmark: any,
  onSubmit: (data: any) => void;
  onCancel: () => void;
}>) {
  const [formData, setFormData] = useState({
    user_id: 0,
    video_id: 0,
    is_bookmark: false,
  });

  useEffect(() => {
    if (bookmark) {
      setFormData({
        user_id: parseInt(bookmark?.data?.user_id),
        video_id: parseInt(bookmark?.data?.video_id),
        is_bookmark: bookmark?.data?.is_bookmark,
      });
    }
  }, [bookmark]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label htmlFor="user_id">User ID</Label>
      <Input
        id="user_id"
        name="user_id"
        type="number"
        value={formData.user_id}
        onChange={handleChange}
        placeholder="User ID"
      />
      <Label htmlFor="video_id">Video ID</Label>
      <Input
        id="video_id"
        name="video_id"
        type="number"
        value={formData.video_id}
        onChange={handleChange}
        placeholder="Video ID"
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" variant="default">
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
