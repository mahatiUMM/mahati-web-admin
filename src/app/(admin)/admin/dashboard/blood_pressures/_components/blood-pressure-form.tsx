import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostBloodPressure } from "@/lib/hooks/useBloodPressures";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BloodPressureForm({
  fetchUsers,
  refetchPressure,
  closeDialog,
}: Readonly<{
  fetchUsers: any;
  refetchPressure: () => void;
  closeDialog: () => void;
}>) {
  const { mutate: postBloodPressure } = usePostBloodPressure();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const formSchema = z.object({
    user_id: z.string().min(1).max(300),
    image: z.instanceof(File).nullable(),
    sistol: z.string().min(2).max(300),
    diastole: z.string().min(2).max(300),
    heartbeat: z.string().min(2).max(300),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      image: null,
      sistol: "",
      diastole: "",
      heartbeat: "",
    },
  });

  const handleUserSelect = (value: string) => {
    form.setValue("user_id", value);
    setSelectedUser(value);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("user_id", values.user_id);
    formData.append("sistol", values.sistol);
    formData.append("diastole", values.diastole);
    formData.append("heartbeat", values.heartbeat);
    if (values.image) {
      formData.append("image", values.image);
    }
    await postBloodPressure(formData);
    refetchPressure();
    closeDialog();
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select User</FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleUserSelect}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a user">
                      {fetchUsers?.find((user: any) => user.id.toString() === selectedUser)?.username || "Select a user"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {fetchUsers?.map((user: any) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0] || null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sistol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sistol</FormLabel>
              <FormControl>
                <Input placeholder="Sistol" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diastole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diastole</FormLabel>
              <FormControl>
                <Input placeholder="Diastole" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heartbeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heartbeat</FormLabel>
              <FormControl>
                <Input placeholder="Heartbeat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button type="submit" variant="default">
            Save
          </Button>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
