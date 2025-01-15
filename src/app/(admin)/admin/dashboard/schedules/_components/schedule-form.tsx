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
import { usePostSchedule } from "@/lib/hooks/useSchedule";

export default function ScheduleForm({
  fetchReminders,
  refetchSchedule,
  closeDialog,
}: Readonly<{
  fetchReminders: any,
  refetchSchedule: () => void,
  closeDialog: () => void,
}>) {
  const { mutate: postSchedule } = usePostSchedule();
  const [selectedReminder, setSelectedReminder] = useState<string>("");

  const fomrSchema = z.object({
    reminder_id: z.string().min(1).max(300),
    time: z.string().min(1).max(300),
    status: z.number().min(0).max(1),
  });

  const form = useForm<z.infer<typeof fomrSchema>>({
    resolver: zodResolver(fomrSchema),
    defaultValues: {
      reminder_id: "",
      time: "",
      status: 0,
    },
  });

  const handleReminderSelect = (value: string) => {
    form.setValue("reminder_id", value);
    setSelectedReminder(value);
  };

  const onSubmit = async (values: z.infer<typeof fomrSchema>) => {
    const { reminder_id, time, status } = values;
    await postSchedule({
      reminder_id: Number(reminder_id),
      time,
      status,
    });
    refetchSchedule();
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reminder_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Reminder</FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleReminderSelect}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a reminder">
                      {fetchReminders?.data?.find(
                        (reminder: any) => reminder.id === Number(selectedReminder)
                      )?.medicine_name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {fetchReminders?.data?.map((reminder: any) => (
                      <SelectItem
                        key={reminder.id}
                        value={reminder.id}
                      >
                        {reminder.medicine_name}
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
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Time"
                  type="datetime-local"
                  value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                  onChange={(e) => {
                    const inputDate = e.target.value;
                    const isoDate = new Date(inputDate).toISOString();
                    field.onChange(isoDate);
                  }}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input
                  placeholder="Status"
                  type="checkbox"
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  name={field.name}
                  ref={field.ref}
                />
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
  )
}