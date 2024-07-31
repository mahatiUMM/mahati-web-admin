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
  useGetBrochureById,
  usePutBrochure,
  useDeleteBrochure,
} from "@/lib/hooks/useBrochure";

export default function BrochureTable({
  brochures,
  refetchBrochure,
}: Readonly<{
  brochures: {
    id: number,
    title: string,
    image: string,
    created_at: string,
    updated_at: string,
  }[];
  refetchBrochure: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBrochureEdit, setSelectedBrochureEdit] = useState<number | null>(null);
  const [selectedBrochureDelete, setSelectedBrochureDelete] = useState<number | null>(null);

  const { data: brochure, fetchData } = useGetBrochureById();
  const { putData: updateBrochure } = usePutBrochure();
  const { deleteData: deleteBrochure } = useDeleteBrochure();

  const handleEditClick = (id: number) => {
    setSelectedBrochureEdit(id);
    fetchData(id);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedBrochureDelete(id);
    setIsDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedBrochureEdit(null);
    setDialogOpen(false);
  }

  const handleDeleteDialogClose = () => {
    setSelectedBrochureDelete(null);
    setIsDialogOpen(false);
  }

  const handlePutBrochure = async (formData: any) => {
    if (selectedBrochureEdit) {
      await updateBrochure(selectedBrochureEdit, formData);
      refetchBrochure();
      handleEditDialogClose();
    }
  }

  const handleDeleteBrochure = async () => {
    if (selectedBrochureDelete) {
      await deleteBrochure(selectedBrochureDelete);
      refetchBrochure();
      handleDeleteDialogClose();
    }
  }

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures?.map((brochure) => (
            <TableRow key={brochure.id}>
              <TableCell>{brochure.id}</TableCell>
              <TableCell>{brochure.title}</TableCell>
              <TableCell>{brochure.image}</TableCell>
              <TableCell>{brochure.created_at}</TableCell>
              <TableCell>{brochure.updated_at}</TableCell>
              <TableCell>
                <Button
                  className="rounded-full px-1 py-1"
                  variant={"outline"}
                  onClick={() => handleEditClick(brochure.id)}
                >
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button
                  className="rounded-full px-1 py-1"
                  variant={"outline"}
                  onClick={() => handleDeleteClick(brochure.id)}
                >
                  <Trash className="text-red-400 h-5 w-5" />

                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {selectedBrochureEdit && brochure(
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Brochure"
          description="Enter the details for the brochure."
        >
          <BrochureForm
            onSubmit={handlePutBrochure}
            onCancel={handleEditDialogClose}
            brochure={brochure}
          />
        </CustomDialog>
      )} */}
      <AlertDialog open={isDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brochure</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this brochure?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDeleteBrochure}>Yes</AlertDialogAction>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>No</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}