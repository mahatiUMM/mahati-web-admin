"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BloodPressureFormEdit({
  pressure,
  onSubmit,
  onCancel
}: Readonly<{
  pressure: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}>) {
  const [formData, setFormData] = useState({
    user_id: 0,
    image: "",
    sistol: 0,
    diastole: 0,
    heartbeat: 0
  });

  useEffect(() => {
    if (pressure) {
      setFormData({
        user_id: parseInt(pressure?.data?.user_id),
        image: pressure?.data?.image,
        sistol: parseInt(pressure?.data?.sistol),
        diastole: parseInt(pressure?.data?.diastole),
        heartbeat: parseInt(pressure?.data?.heartbeat)
      });
    }
  }, [pressure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "user_id" || name === "sistol" || name === "diastole" || name === "heartbeat"
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
