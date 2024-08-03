import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Info, Trash } from "lucide-react";
import { CustomDialog } from "@/components/layout/custom-dialog";
import {
  useGetScheduleById,
  usePutSchedule,
  useDeleteSchedule,
} from "@/lib/hooks/useSchedule";

export default function ScheduleTable({
  schedules,
  refetchSchedule,
}: Readonly<{
  schedules: {
    id: number,
    reminder_id: number,
    time: string,
    status: number,
    created_at: string,
    updated_at: string,
    reminder: {
      id: number,
      user_id: number,
      medicine_name: string,
      medicine_taken: number,
      medicine_total: number,
      amount: number,
      cause: string,
      cap_size: number,
      medicine_time: string,
      expired_at: string,
      created_at: string,
      updated_at: string,
    }
  }[];
  refetchSchedule: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedScheduleEdit, setSelectedScheduleEdit] = useState<number | null>(null);
  const [selectedScheduleDelete, setSelectedScheduleDelete] = useState<number | null>(null);

  const { data: schedule, fetchData } = useGetScheduleById();
  const { putData: updateSchedule } = usePutSchedule();
  const { deleteData: deleteSchedule } = useDeleteSchedule();

  const handleEditClick = (id: number) => {
    setSelectedScheduleEdit(id);
    fetchData(id);
    setDialogOpen(true);
  }

  const handleDeleteClick = (id: number) => {
    setSelectedScheduleDelete(id);
    setIsDialogOpen(true);
  }

  const handleEditDialogClose = () => {
    setSelectedScheduleEdit(null);
    setDialogOpen(false);
  }

  const handleDeleteDialogClose = () => {
    setSelectedScheduleDelete(null);
    setIsDialogOpen(false);
  }

  const handlePutSchedule = async (formData: any) => {
    if (selectedScheduleEdit) {
      await updateSchedule(selectedScheduleEdit, formData);
      refetchSchedule();
      handleEditDialogClose();
    }
  }

  const handleDeleteSchedule = async () => {
    if (selectedScheduleDelete) {
      await deleteSchedule(selectedScheduleDelete);
      refetchSchedule();
      handleDeleteDialogClose();
    }
  }

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead>Reminder ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Reminder</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules?.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell className="hidden lg:table-cell">{schedule.id}</TableCell>
              <TableCell>{schedule.reminder_id}</TableCell>
              <TableCell>{schedule.time}</TableCell>
              <TableCell>{schedule.status}</TableCell>
              <TableCell>{schedule.created_at}</TableCell>
              <TableCell>{schedule.updated_at}</TableCell>
              <TableCell>
                <div>
                  <p>{schedule.reminder.medicine_name}</p>
                  <p>{schedule.reminder.medicine_taken}</p>
                  <p>{schedule.reminder.medicine_total}</p>
                  <p>{schedule.reminder.amount}</p>
                  <p>{schedule.reminder.cause}</p>
                  <p>{schedule.reminder.cap_size}</p>
                  <p>{schedule.reminder.medicine_time}</p>
                  <p>{schedule.reminder.expired_at}</p>
                  <p>{schedule.reminder.created_at}</p>
                  <p>{schedule.reminder.updated_at}</p>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  className="rounded-full px-1 py-1"
                  variant={"outline"}
                  onClick={() => handleEditClick(schedule.id)}
                >
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button
                  className="rounded-full px-1 py-1"
                  variant={"outline"}
                  onClick={() => handleDeleteClick(schedule.id)}
                >
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}