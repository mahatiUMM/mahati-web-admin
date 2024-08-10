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
    image: z.string().min(1),
    sistol: z.string().min(2).max(300),
    diastole: z.string().min(2).max(300),
    heartbeat: z.string().min(2).max(300),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      image: "",
      sistol: "",
      diastole: "",
      heartbeat: "",
    },
  });

  const handleUserSelect = (value: string) => {
    form.setValue("user_id", value);
    setSelectedUser(value);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      user_id: parseInt(values.user_id),
      image: values.image,
      sistol: parseInt(values.sistol),
      diastole: parseInt(values.diastole),
      heartbeat: parseInt(values.heartbeat),
    };
    await postBloodPressure(formData);
    refetchPressure();
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                  onChange={(e) => field.onChange(e.target.files?.[0]?.name)}
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
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
