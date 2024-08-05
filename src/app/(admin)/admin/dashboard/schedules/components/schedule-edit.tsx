import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ScheduleFormEdit({
  schedule,
  onSubmit,
  onCancel,
}: Readonly<{
  schedule: any,
  onSubmit: (data: any) => void;
  onCancel: () => void;
}>) {
  const [formData, setFormData] = useState({
    id: "",
    reminder_id: "",
    status: "",
    created_at: "",
    updated_at: "",
    reminder: {
      id: "",
      user_id: "",
      medicine_name: "",
      medicine_taken: "",
      medicine_total: "",
      amount: "",
      cause: "",
      cap_size: "",
      medicine_time: "",
      expired_at: "",
      created_at: "",
      updated_at: "",
    }
  })

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="reminder_id">Reminder ID</Label>
      <Input id="reminder_id" name="reminder_id" placeholder="Reminder ID" />
      <Label htmlFor="time">Time</Label>
      <Input id="time" name="time" placeholder="Time" />
      <Label htmlFor="status">Status</Label>
      <Input id="status" name="status" placeholder="Status" />
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