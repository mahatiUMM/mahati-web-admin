import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ReminderForm({
  onSubmit,
  onCancel,
}: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="user_id">User ID</Label>
          <Input id="user_id" name="user_id" placeholder="User ID" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="medicine_name">Medicine Name</Label>
          <Input id="medicine_name" name="medicine_name" placeholder="Medicine Name" />
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="medicine_taken">Medicine Taken</Label>
          <Input id="medicine_taken" name="medicine_taken" placeholder="Medicine Taken" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" name="amount" placeholder="Amount" />
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="cause">Cause</Label>
          <Input id="cause" name="cause" placeholder="Cause" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cap_size">Cap Size</Label>
          <Input id="cap_size" name="cap_size" placeholder="Cap Size" />
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="space-y-1">
          <Label htmlFor="medicine_time">Medicine Time</Label>
          <Input id="medicine_time" name="medicine_time" placeholder="Medicine Time" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="expired_at">Expired At</Label>
          <Input id="expired_at" name="expired_at" placeholder="Expired At" />
        </div>
      </div>
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