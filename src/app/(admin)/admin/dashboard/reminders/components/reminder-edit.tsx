import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReminderFormEdit({
  reminder,
  onSubmit,
  onCancel,
}: Readonly<{
  reminder: any,
  onSubmit: (data: any) => void;
  onCancel: () => void;
}>) {
  const [formData, setFormData] = useState({
    user_id: "",
    medicine_name: "",
    medicine_taken: "",
    medicine_total: "",
    amount: "",
    cause: "",
    cap_size: "",
    medicine_time: "",
    expired_at: "",
  });

  useEffect(() => {
    if (reminder) {
      setFormData({
        user_id: reminder?.data?.user_id,
        medicine_name: reminder?.data?.medicine_name,
        medicine_taken: reminder?.data?.medicine_taken,
        medicine_total: reminder?.data?.medicine_total,
        amount: reminder?.data?.amount,
        cause: reminder?.data?.cause,
        cap_size: reminder?.data?.cap_size,
        medicine_time: reminder?.data?.medicine_time,
        expired_at: reminder?.data?.expired_at,
      });
    }
  }, [reminder]);

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
      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="user_id">User ID</Label>
          <Input
            id="user_id"
            name="user_id"
            type="text"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="User ID"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="medicine_name">Medicine Name</Label>
          <Input
            id="medicine_name"
            name="medicine_name"
            type="text"
            value={formData.medicine_name}
            onChange={handleChange}
            placeholder="Medicine Name"
          />
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="medicine_taken">Medicine Taken</Label>
          <Input
            id="medicine_taken"
            name="medicine_taken"
            type="text"
            value={formData.medicine_taken}
            onChange={handleChange}
            placeholder="Medicine Taken"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="medicine_total">Medicine Total</Label>
          <Input
            id="medicine_total"
            name="medicine_total"
            type="text"
            value={formData.medicine_total}
            onChange={handleChange}
            placeholder="Medicine Total"
          />
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="text"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cause">Cause</Label>
          <Input
            id="cause"
            name="cause"
            type="text"
            value={formData.cause}
            onChange={handleChange}
            placeholder="Cause"
          />
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="cap_size">Cap Size</Label>
          <Input
            id="cap_size"
            name="cap_size"
            type="text"
            value={formData.cap_size}
            onChange={handleChange}
            placeholder="Cap Size"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="medicine_time">Medicine Time</Label>
          <Input
            id="medicine_time"
            name="medicine_time"
            type="text"
            value={formData.medicine_time}
            onChange={handleChange}
            placeholder="Medicine Time"
          />
        </div>
      </div>
      <Label htmlFor="expired_at">Expired At</Label>
      <Input
        id="expired_at"
        name="expired_at"
        type="text"
        value={formData.expired_at}
        onChange={handleChange}
        placeholder="Expired At"
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