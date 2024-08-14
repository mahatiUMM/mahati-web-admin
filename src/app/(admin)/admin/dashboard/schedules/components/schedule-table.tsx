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
import { useGetAllUsers } from "@/lib/hooks/useUsers"
import ScheduleFormEdit from "./schedule-edit";
import { formatDate, checkUpdatedAt } from "@/lib/utils";

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

  const { data: users } = useGetAllUsers();
  const { data: schedule, fetchData } = useGetScheduleById();
  const { putData: updateSchedule } = usePutSchedule();
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
              <TableCell>{formatDate(schedule.time)}</TableCell>
              <TableCell>{schedule.status === 0 ? "Belum di minum" : "Sudah di minum"}</TableCell>
              <TableCell>{formatDate(schedule.created_at)}</TableCell>
              <TableCell>{checkUpdatedAt(schedule.updated_at)}</TableCell>
              <TableCell>
                <div className="flex flex-col w-fit gap-2">
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    ID: {schedule.reminder.id}
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Username: {userMap.get(schedule.reminder.user_id) as string || 'Unknown User'}
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Medicine Name: {schedule.reminder.medicine_name}
                  </div>
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Medicine Taken: {schedule.reminder.medicine_taken ? 'Yes' : 'No'}
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    Medicine Total: {schedule.reminder.medicine_total}
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    Amount: {schedule.reminder.amount}
                  </div>
                  <div className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                    Cause: {schedule.reminder.cause}
                  </div>
                  <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                    Cap Size: {schedule.reminder.cap_size}
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    Medicine Time: {schedule.reminder.medicine_time}
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    Expired At: {schedule.reminder.expired_at}
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Created At: {formatDate(schedule.reminder.created_at)}
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Updated At: {checkUpdatedAt(schedule.reminder.updated_at)}
                  </div>
                </div>
              </TableCell>
              <TableCell className="min-[1600px]:space-x-2 max-[1600px]:space-y-2">
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"secondary"}
                  onClick={() => handleEditClick(schedule.id)}
                >
                  <Info className="text-blue-400 size-6" />
                </Button>
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"destructive"}
                  onClick={() => handleDeleteClick(schedule.id)}
                >
                  <Trash className="text-red-400 size-6" />
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
            onSubmit={handlePutSchedule}
            onCancel={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedScheduleDelete && `Delete Schedule ID: ${selectedScheduleDelete}`}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this schedule?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDeleteSchedule}>Yes</AlertDialogAction>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>No</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}