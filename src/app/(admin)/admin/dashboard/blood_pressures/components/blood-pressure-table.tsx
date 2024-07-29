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
  const [selectedPressureId, setSelectedPressureId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPressureForDeletion, setSelectedPressureForDeletion] = useState<number | null>(null);

  const { data: pressure, fetchData } = useGetBloodPressureById();
  const { putData: updateBloodPressure } = usePutBloodPressure();
  const { deleteData: deleteBloodPressure } = useDeleteBloodPressure();

  const handleEditClick = (id: number) => {
    setSelectedPressureId(id);
    fetchData(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPressureId(null);
  };

  const handleSubmit = async (formData: any) => {
    if (selectedPressureId !== null) {
      await updateBloodPressure(selectedPressureId, formData);
      refetchPressure();
      handleDialogClose();
    }
  };

  const handleOpenDialog = (id: number) => {
    setSelectedPressureForDeletion(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPressureForDeletion(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedPressureForDeletion !== null) {
      await deleteBloodPressure(selectedPressureForDeletion);
      refetchPressure();
      handleCloseDialog();
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
                <Button className="rounded-full px-1 py-1" variant={"outline"} onClick={() => handleOpenDialog(pressure.id)}>
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPressureId !== null && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleDialogClose}
          title="Edit Blood Pressure"
          description="Edit the details for this blood pressure entry."
        >
          <BloodPressureFormEdit
            pressure={pressure}
            onSubmit={handleSubmit}
            onCancel={handleDialogClose}
          />
        </CustomDialog>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedPressureForDeletion ? `Delete Blood Pressure ID ${selectedPressureForDeletion}` : "Delete Blood Pressure"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blood pressure entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
