"use client";

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
  useGetBloodPressureById,
  usePutBloodPressure,
  useDeleteBloodPressure
} from "@/lib/hooks/useBloodPressures";
import BloodPressureFormEdit from "./blood-pressure-edit";

export default function BloodPressureTable({
  pressures,
  refetchPressure
}: Readonly<{
  pressures: {
    id: number;
    user_id: number;
    image: string;
    sistol: number;
    diastole: number;
    heartbeat: number;
    created_at: string;
    updated_at: string;
  }[];
  refetchPressure: () => void;
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPressureEdit, setSelectedPressureEdit] = useState<number | null>(null);
  const [selectedPressureDelete, setSelectedPressureDelete] = useState<number | null>(null);

  const { data: pressure, fetchData } = useGetBloodPressureById();
  const { putData: updateBloodPressure } = usePutBloodPressure();
  const { deleteData: deleteBloodPressure } = useDeleteBloodPressure();

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

  const handlePutPressure = async (formData: any) => {
    if (selectedPressureEdit) {
      await updateBloodPressure(selectedPressureEdit, formData);
      refetchPressure();
      handleEditDialogClose();
    }
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
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead className="">Sistol</TableHead>
            <TableHead className="">Diastole</TableHead>
            <TableHead className="">Heartbeat</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-left">Updated At</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pressures?.map((pressure: any) => (
            <TableRow key={pressure.id}>
              <TableCell className="hidden lg:table-cell">{pressure.id}</TableCell>
              <TableCell>{pressure.user_id}</TableCell>
              <TableCell>{pressure.image}</TableCell>
              <TableCell>{pressure.sistol}</TableCell>
              <TableCell>{pressure.diastole}</TableCell>
              <TableCell>{pressure.heartbeat}</TableCell>
              <TableCell>{pressure.created_at}</TableCell>
              <TableCell>{pressure.updated_at}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Button className="rounded-full px-1 py-1" variant={"outline"} onClick={() => handleEditClick(pressure.id)}>
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button className="rounded-full px-1 py-1" variant={"outline"} onClick={() => handleDeleteClick(pressure.id)}>
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPressureEdit !== null && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Blood Pressure"
          description="Edit the details for this blood pressure entry."
        >
          <BloodPressureFormEdit
            pressure={pressure}
            onSubmit={handlePutPressure}
            onCancel={handleEditDialogClose}
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
