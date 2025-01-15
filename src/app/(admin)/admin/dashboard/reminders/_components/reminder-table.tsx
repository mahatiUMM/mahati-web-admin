import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { CustomAlert } from "@/components/layout/custom-alert";
import { Button } from "@/components/ui/button";
import { Info, Trash } from "lucide-react";
import { CustomDialog } from "@/components/layout/custom-dialog";
import {
  useGetRemiderById,
  useDeleteReminder
} from "@/lib/hooks/useReminder";
import ReminderFormEdit from "./reminder-edit";
import { formatDate, checkUpdatedAt } from "@/lib/utils";

export default function ReminderTable({
  reminders,
  fetchUsers,
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
    cap_size: number,
    medicine_time: string,
    expired_at: string,
    created_at: string,
    updated_at: string,
  }[];
  fetchUsers: any;
  refetchReminder: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReminderEdit, setSelectedReminderEdit] = useState<number | null>(null);
  const [selectedReminderDelete, setSelectedReminderDelete] = useState<number | null>(null);

  const { data: reminder, fetchData } = useGetRemiderById();
  const { deleteData: deleteReminder } = useDeleteReminder();

  const userMap = new Map(fetchUsers?.map((user: any) => [user.id, user.username]));

  const capSize = (capSize: number) => {
    switch (capSize) {
      case 1:
        return <div className="bg-green-400/50 text-black dark:text-white rounded-full px-2 py-1 text-xs text-center font-semibold uppercase tracking-wide">Terbatas</div>;
      case 2:
        return <div className="bg-yellow-400/50 text-black dark:text-white rounded-full px-2 py-1 text-xs text-center font-semibold uppercase tracking-wide">Bebas Keras</div>;
      case 3:
        return <div className="bg-red-400/50 text-black dark:text-white rounded-full px-2 py-1 text-xs text-center font-semibold uppercase tracking-wide">Keras</div>;
      default:
        return "Unknown";
    }
  }

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
              <TableCell>{capSize(reminder.cap_size)}</TableCell>
              <TableCell>{reminder.medicine_time}</TableCell>
              <TableCell>{reminder.expired_at}</TableCell>
              <TableCell>{formatDate(reminder.created_at)}</TableCell>
              <TableCell>{checkUpdatedAt(reminder.updated_at)}</TableCell>
              <TableCell className="min-[1600px]:space-x-2 max-[1600px]:space-y-2">
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"outline"}
                  onClick={() => handleEditClick(reminder.id)}
                >
                  <Info className="text-blue-600 dark:text-blue-400 size-6" />
                </Button>
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"outline"}
                  onClick={() => handleDeleteClick(reminder.id)}
                >
                  <Trash className="text-red-600 dark:text-red-400 size-6" />
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
            fetchUsers={fetchUsers}
            refetchReminder={refetchReminder}
            closeDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <CustomAlert
        open={isDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        onClick={handleDeleteReminder}
        title={`Delete Reminder ID: ${selectedReminderDelete}`}
        description="Are you sure you want to delete this reminder entry?"
      />
    </>
  )
}