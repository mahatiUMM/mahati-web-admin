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
  useGetRemiderById,
  usePutReminder,
  useDeleteReminder
} from "@/lib/hooks/useReminder";
import { useGetAllUsers } from "@/lib/hooks/useUsers";
import ReminderFormEdit from "./reminder-edit";

export default function ReminderTable({
  reminders,
  refetchReminder,
}: Readonly<{
  reminders: {
    id: number,
    user_id: number,
    medicine_name: string,
    medicine_taken: number,
    medicine_total: number,
    amount: number,
    cause: string,
    cap_size: string,
    medicine_time: string,
    expired_at: string,
    created_at: string,
    updated_at: string,
  }[];
  refetchReminder: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReminderEdit, setSelectedReminderEdit] = useState<number | null>(null);
  const [selectedReminderDelete, setSelectedReminderDelete] = useState<number | null>(null);

  const { data: users } = useGetAllUsers();
  const { data: reminder, fetchData } = useGetRemiderById();
  const { putData: updateReminder } = usePutReminder();
  const { deleteData: deleteReminder } = useDeleteReminder();

  const userMap = new Map(users?.data?.map((user: any) => [user.id, user.username]));

  const handleEditClick = (id: number) => {
    setSelectedReminderEdit(id);
    fetchData(id);
    setDialogOpen(true);
  }

  const handleDeleteClick = (id: number) => {
    setSelectedReminderDelete(id);
    setIsDialogOpen(true);
  }

  const handleEditDialogClose = () => {
    setSelectedReminderEdit(null);
    setDialogOpen(false);
  }

  const handleDeleteDialogClose = () => {
    setSelectedReminderDelete(null);
    setIsDialogOpen(false);
  }

  const handlePutReminder = async (formData: any) => {
    if (selectedReminderEdit) {
      await updateReminder(selectedReminderEdit, formData);
      refetchReminder();
      handleEditDialogClose();
    }
  }

  const handleDeleteReminder = async () => {
    if (selectedReminderDelete) {
      await deleteReminder(selectedReminderDelete);
      refetchReminder();
      handleDeleteDialogClose();
    }
  }

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Medicine Taken</TableHead>
            <TableHead>Medicine Total</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Cause</TableHead>
            <TableHead>Cap Size</TableHead>
            <TableHead>Medicine Time</TableHead>
            <TableHead>Expired At</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reminders?.map((reminder) => (
            <TableRow key={reminder.id}>
              <TableCell>{reminder.id}</TableCell>
              <TableCell>
                {userMap.get(reminder.user_id) as string || 'Unknown User'}
              </TableCell>
              <TableCell>{reminder.medicine_name}</TableCell>
              <TableCell>{reminder.medicine_taken}</TableCell>
              <TableCell>{reminder.medicine_total}</TableCell>
              <TableCell>{reminder.amount}</TableCell>
              <TableCell>{reminder.cause}</TableCell>
              <TableCell>{reminder.cap_size}</TableCell>
              <TableCell>{reminder.medicine_time}</TableCell>
              <TableCell>{reminder.expired_at}</TableCell>
              <TableCell>{reminder.created_at}</TableCell>
              <TableCell>{reminder.updated_at}</TableCell>
              <TableCell className="min-[800px]:space-x-2 max-[800px]:space-y-2">
                <Button
                  className="rounded-full p-2 size-10"
                  variant={"secondary"}
                  onClick={() => handleEditClick(reminder.id)}
                >
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button
                  className="rounded-full p-2 size-10"
                  variant={"destructive"}
                  onClick={() => handleDeleteClick(reminder.id)}
                >
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedReminderEdit && reminder && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Reminder"
          description="Update the details for the selected reminder entry."
        >
          <ReminderFormEdit
            reminder={reminder}
            onSubmit={handlePutReminder}
            onCancel={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedReminderDelete && `Delete Reminder ID: ${selectedReminderDelete}`}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this reminder?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDeleteReminder}>Yes</AlertDialogAction>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>No</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}