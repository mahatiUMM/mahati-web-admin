import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BloodPressureForm({ onSubmit, onCancel }: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="user_id">User ID</Label>
      <Input id="user_id" name="user_id" placeholder="User ID" />
      <Label htmlFor="image">Image URL</Label>
      <Input id="image" name="image" placeholder="Image URL" />
      <Label htmlFor="sistol">Sistol</Label>
      <Input id="sistol" name="sistol" placeholder="Sistol" />
      <Label htmlFor="diastole">Diastole</Label>
      <Input id="diastole" name="diastole" placeholder="Diastole" />
      <Label htmlFor="heartbeat">Heartbeat</Label>
      <Input id="heartbeat" name="heartbeat" placeholder="Heartbeat" />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" variant={"default"}>
          Save
        </Button>
        <Button type="button" variant={"outline"} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
