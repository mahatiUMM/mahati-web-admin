import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { CustomDialog } from "@/components/layout/custom-dialog";
import { Button } from "@/components/ui/button";
import { Info, Trash } from "lucide-react";
import {
  useGetScheduleById,
  useDeleteSchedule,
} from "@/lib/hooks/useSchedule";
import { useGetAllUsers } from "@/lib/hooks/useUsers"
import ScheduleFormEdit from "./schedule-edit";
import { formatDate, checkUpdatedAt } from "@/lib/utils";
import { CustomAlert } from "@/components/layout/custom-alert";

export default function ScheduleTable({
  schedules,
  fetchReminders,
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
  fetchReminders: any,
  refetchSchedule: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedScheduleEdit, setSelectedScheduleEdit] = useState<number | null>(null);
  const [selectedScheduleDelete, setSelectedScheduleDelete] = useState<number | null>(null);

  const { data: users } = useGetAllUsers();
  const { data: schedule, fetchData } = useGetScheduleById();
  const { deleteData: deleteSchedule } = useDeleteSchedule();

  const userMap = new Map(users?.data?.map((user: any) => [user.id, user.username]));

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
            <TableHead>Taken</TableHead>
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
              <TableCell>{formatDate(schedule.time)}</TableCell>
              <TableCell className="text-center">
                {schedule.status === 0 ?
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    No
                  </div>
                  :
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Yes
                  </div>}
              </TableCell>
              <TableCell>{formatDate(schedule.created_at)}</TableCell>
              <TableCell>{checkUpdatedAt(schedule.updated_at)}</TableCell>
              <TableCell>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">User</TableHead>
                    <TableHead className="w-40">Medicine</TableHead>
                    <TableHead>Taken</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-40">Cause</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{userMap.get(schedule.reminder.user_id) as string || 'Unknown User'}</TableCell>
                    <TableCell>{schedule.reminder.medicine_name}</TableCell>
                    <TableCell>{schedule.reminder.medicine_taken}</TableCell>
                    <TableCell>{schedule.reminder.medicine_total}</TableCell>
                    <TableCell>{schedule.reminder.amount}</TableCell>
                    <TableCell>{schedule.reminder.cause}</TableCell>
                  </TableRow>
                </TableBody>
              </TableCell>
              <TableCell className="min-[1600px]:space-x-2 max-[1600px]:space-y-2">
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"outline"}
                  onClick={() => handleEditClick(schedule.id)}
                >
                  <Info className="text-blue-600 dark:text-blue-400 size-6" />
                </Button>
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"outline"}
                  onClick={() => handleDeleteClick(schedule.id)}
                >
                  <Trash className="text-red-600 dark:text-red-400 size-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedScheduleEdit && schedule && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Schedule"
          description="Update the details for the selected schedule entry."
        >
          <ScheduleFormEdit
            schedule={schedule}
            fetchReminders={fetchReminders}
            refetchSchedule={refetchSchedule}
            closeDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <CustomAlert
        open={isDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        onClick={handleDeleteSchedule}
        title={`Delete Schedule ID: ${selectedScheduleDelete}`}
        description="Are you sure you want to delete this schedule entry?"
      />
    </>
  )
}