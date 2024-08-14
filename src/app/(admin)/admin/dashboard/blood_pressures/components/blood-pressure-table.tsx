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
import Image from "next/image";
import Link from "next/link";
import { CustomDialog } from "@/components/layout/custom-dialog";
import {
  useGetBloodPressureById,
  useDeleteBloodPressure
} from "@/lib/hooks/useBloodPressures";
import BloodPressureFormEdit from "./blood-pressure-edit";
import { formatDate, checkUpdatedAt } from "../../../../../../lib/utils";

export default function BloodPressureTable({
  pressures,
  fetchUsers,
  refetchPressure
}: Readonly<{
  fetchUsers: any;
  pressures: {
    data: {
      id: number;
      user_id: number;
      image: string;
      sistol: number;
      diastole: number;
      heartbeat: number;
      created_at: string;
      updated_at: string;
    }[];
  }
  refetchPressure: () => void;
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPressureEdit, setSelectedPressureEdit] = useState<number | null>(null);
  const [selectedPressureDelete, setSelectedPressureDelete] = useState<number | null>(null);

  const { data: pressure, fetchData } = useGetBloodPressureById();
  const { deleteData: deleteBloodPressure } = useDeleteBloodPressure();

  const userMap = new Map(fetchUsers?.map((user: any) => [user.id, user.username]));

  const handleEditClick = (id: number) => {
    setSelectedPressureEdit(id);
    fetchData(id);
    setDialogOpen(true);
  };
  const handleDeleteClick = (id: number) => {
    setSelectedPressureDelete(id);
    setIsDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setDialogOpen(false);
    setSelectedPressureEdit(null);
  };
  const handleDeleteDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPressureDelete(null);
  };

  const handleDeletePressure = async () => {
    if (selectedPressureDelete) {
      await deleteBloodPressure(selectedPressureDelete);
      refetchPressure();
      handleDeleteDialogClose();
    }
  };

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell text-left">ID</TableHead>
            <TableHead className="text-left">Username</TableHead>
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-left">Sistol</TableHead>
            <TableHead className="text-left">Diastole</TableHead>
            <TableHead className="text-left">Heartbeat</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="hidden lg:table-cell text-left">Updated At</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pressures?.data?.map((pressure: any) => (
            <TableRow key={pressure.id}>
              <TableCell className="hidden lg:table-cell">{pressure.id}</TableCell>
              <TableCell>
                {userMap.get(pressure.user_id) as string || 'Unknown User'}
              </TableCell>
              <TableCell>
                <Link
                  href={pressure.image === ""
                    ? "/no-image.jpg"
                    : `https://mahati.xyzuan.my.id/${pressure.image}`
                  }
                  target="_blank"
                >
                  <Image
                    src={pressure.image === ""
                      ? "/no-image.jpg"
                      : `https://mahati.xyzuan.my.id/${pressure.image}`
                    }
                    width={100}
                    height={100}
                    className="rounded-lg"
                    alt={pressure.id}
                  />
                </Link>
              </TableCell>
              <TableCell>{pressure.sistol}</TableCell>
              <TableCell>{pressure.diastole}</TableCell>
              <TableCell>{pressure.heartbeat}</TableCell>
              <TableCell>{formatDate(pressure.created_at)}</TableCell>
              <TableCell className="hidden lg:table-cell">
                {checkUpdatedAt(pressure.updated_at)}
              </TableCell>
              <TableCell className="min-[800px]:space-x-2 max-[800px]:space-y-2">
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"secondary"}
                  onClick={() => handleEditClick(pressure.id)}
                >
                  <Info className="text-blue-400 size-6" />
                </Button>
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"destructive"}
                  onClick={() => handleDeleteClick(pressure.id)}
                >
                  <Trash className="text-red-400 size-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedPressureEdit && pressure && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Blood Pressure"
          description="Edit the details for this blood pressure entry."
        >
          <BloodPressureFormEdit
            pressure={pressure}
            fetchUsers={fetchUsers}
            refetchPressure={refetchPressure}
            closeDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedPressureDelete ? `Delete Blood Pressure ID ${selectedPressureDelete}` : "Delete Blood Pressure"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePressure}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
