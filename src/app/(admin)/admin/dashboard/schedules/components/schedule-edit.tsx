import { z } from "zod";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePutSchedule } from "@/lib/hooks/useSchedule";

export default function ScheduleFormEdit({
  schedule,
  fetchReminders,
  refetchSchedule,
  closeDialog,
}: Readonly<{
  schedule: any,
  fetchReminders: any,
  refetchSchedule: () => void,
  closeDialog: () => void;
}>) {
  const { putData: updateSchedule } = usePutSchedule();
  const [selectedReminder, setSelectedReminder] = useState<string>("");

  const formSchema = z.object({
    reminder_id: z.string().min(1).max(300),
    time: z.string().min(1).max(300),
    status: z.number().min(0).max(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reminder_id: "",
      time: "",
      status: 0,
    },
  });

  useEffect(() => {
    if (schedule) {
      form.setValue("reminder_id", schedule?.data?.reminder_id.toString());
      form.setValue("time", schedule?.data?.time.toString());
      form.setValue("status", schedule?.data?.status.toString());
      setSelectedReminder(schedule?.data?.reminder?.id);
    }
  }, [schedule, form]);

  const handleReminderSelect = (value: string) => {
    form.setValue("reminder_id", value);
    setSelectedReminder(value);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { reminder_id, time, status } = values;
    try {
      await updateSchedule(schedule?.data?.id, {
        reminder_id: Number(reminder_id),
        time,
        status: Number(status),
      });
      refetchSchedule();
      closeDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reminder_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reminder</FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleReminderSelect}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reminder">
                      {fetchReminders?.data?.find((reminder: any) => reminder.id === Number(selectedReminder))?.medicine_name || "Select reminder"}
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
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status">
                      {field.value.toString() === "0" ? "No" : "Yes"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"0"}>No</SelectItem>
                    <SelectItem value={"1"}>Yes</SelectItem>
                  </SelectContent>
                </Select>
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