import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BloodPressureFormEdit({ pressure, onSubmit, onCancel }: {
  pressure: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    user_id: '',
    image: '',
    sistol: '',
    diastole: '',
    heartbeat: ''
  });

  useEffect(() => {
    if (pressure) {
      setFormData({
        user_id: pressure.user_id || '',
        image: pressure.image || '',
        sistol: pressure.sistol || '',
        diastole: pressure.diastole || '',
        heartbeat: pressure.heartbeat || ''
      });
    }
  }, [pressure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        value={formData.user_id}
        onChange={handleChange}
        placeholder={pressure?.data?.user_id}
      />
      <Label htmlFor="image">Image URL</Label>
      <Input
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder={pressure?.data?.image}
      />
      <Label htmlFor="sistol">Sistol</Label>
      <Input
        id="sistol"
        name="sistol"
        type="number"
        value={formData.sistol}
        onChange={handleChange}
        placeholder={pressure?.data?.sistol}
      />
      <Label htmlFor="diastole">Diastole</Label>
      <Input
        id="diastole"
        name="diastole"
        type="number"
        value={formData.diastole}
        onChange={handleChange}
        placeholder={pressure?.data?.diastole}
      />
      <Label htmlFor="heartbeat">Heartbeat</Label>
      <Input
        id="heartbeat"
        name="heartbeat"
        type="number"
        value={formData.heartbeat}
        onChange={handleChange}
        placeholder={pressure?.data?.heartbeat}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" variant={"default"}>Save</Button>
        <Button type="button" variant={"outline"} onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};
