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
import { Info, Trash, Check, X } from "lucide-react";
import { CustomDialog } from "@/components/layout/custom-dialog";

export default function UsersTable({
  users,
  refetchUsers,
}: Readonly<{
  users: {
    id: number,
    username: string,
    email: string,
    number: string,
    photo: string,
    isAdmin: boolean,
    created_at: string,
    updated_at: string,
  }[];
  refetchUsers: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserEdit, setSelectedUserEdit] = useState<number | null>(null);
  const [selectedUserDelete, setSelectedUserDelete] = useState<number | null>(null);

  return (

    <Table className="my-4 lg:my-0">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Photo</TableHead>
          <TableHead>Is Admin</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.number}</TableCell>
            <TableCell>{user.photo}</TableCell>
            <TableCell>
              {user.isAdmin ? <Check /> : <X />}
            </TableCell>
            <TableCell>{user.created_at}</TableCell>
            <TableCell>{user.updated_at}</TableCell>
            <TableCell className="min-[1600px]:space-x-2 max-[1600px]:space-y-2">
              <Button
                className="rounded-full p-1 size-8"
                variant={"secondary"}
              >
                <Info className="text-blue-400 size-6" />
              </Button>
              <Button
                className="rounded-full p-1 size-8"
                variant={"destructive"}
              >
                <Trash className="text-red-400 size-6" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}