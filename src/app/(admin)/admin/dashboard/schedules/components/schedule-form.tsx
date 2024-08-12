import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ScheduleForm({
  onSubmit,
  onCancel,
}: Readonly<{
  onSubmit: (e: any) => void;
  onCancel: () => void;
}>) {
  const [date, setDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (date) {
      setFormattedDate(format(date, "yyyy-MM-dd HH:mm:ss.SSS"));
    }
  }, [date]);

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label htmlFor="reminder_id">Reminder ID</Label>
      <Input id="reminder_id" name="reminder_id" placeholder="Reminder ID" />
      <Label htmlFor="time">Time</Label>
      <Input type="hidden" id="time" name="time" placeholder="Time" value={formattedDate} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="time"
            name="time"
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd HH:mm:ss.SSS") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day: Date | undefined) => setDate(day || new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Label htmlFor="status">Status</Label>
      <Input id="status" name="status" placeholder="Status" />
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