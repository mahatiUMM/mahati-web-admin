import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { usePostReminder } from "@/lib/hooks/useReminder";

export default function ReminderForm({
  fetchUsers,
  refetchReminder,
  closeDialog,
}: Readonly<{
  fetchUsers: any;
  refetchReminder: () => void;
  closeDialog: () => void;
}>) {
  const { mutate: postReminder } = usePostReminder();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const formSchema = z.object({
    user_id: z.string().min(1).max(300),
    medicine_name: z.string().min(1).max(300),
    medicine_taken: z.string().min(1).max(300),
    amount: z.string().min(1).max(300),
    cause: z.string().min(1).max(300),
    cap_size: z.string().min(1).max(300),
    medicine_time: z.string().min(1).max(300),
    expired_at: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      medicine_name: "",
      medicine_taken: "",
      amount: "",
      cause: "",
      cap_size: "",
      medicine_time: "",
      expired_at: null,
    },
  });

  const handleUserSelect = (value: string) => {
    form.setValue("user_id", value);
    setSelectedUser(value);
  };

  const handleCapSize = (value: string) => {
    form.setValue("cap_size", value);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await postReminder({
      user_id: Number(values.user_id),
      medicine_name: values.medicine_name,
      medicine_taken: Number(values.medicine_taken),
      medicine_total: (Number(values.amount) - Number(values.medicine_taken)),
      amount: Number(values.amount),
      cause: values.cause,
      cap_size: Number(values.cap_size),
      medicine_time: values.medicine_time,
      expired_at: values.expired_at,
    });
    refetchReminder();
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem className="w-full">
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
            name="medicine_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Medicine Name</FormLabel>
                <FormControl>
                  <Input placeholder="Medicine Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="medicine_taken"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Medicine Taken</FormLabel>
                <FormControl>
                  <Input placeholder="Medicine Taken" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="cause"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cause</FormLabel>
                <FormControl>
                  <Input placeholder="Cause" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cap_size"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Cap Size</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={handleCapSize}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Cap Size">
                        {field.value || "Select Cap Size"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Terbatas</SelectItem>
                      <SelectItem value="2">Bebas Keras</SelectItem>
                      <SelectItem value="3">Keras</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="medicine_time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Medicine Time</FormLabel>
                <FormControl>
                  <Input placeholder="Medicine Time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expired_at"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Expired At</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expired At"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
  )
}