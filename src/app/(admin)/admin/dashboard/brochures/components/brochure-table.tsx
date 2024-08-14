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
  useGetBrochureById,
  useDeleteBrochure,
} from "@/lib/hooks/useBrochure";
import BrochureFormEdit from "./brochure-edit";
import { formatDate, checkUpdatedAt } from "@/lib/utils";

export default function BrochureTable({
  brochures,
  refetchBrochure,
}: Readonly<{
  brochures: {
    id: number,
    title: string,
    images: {
      id: number,
      imagePath: string,
      brochureId: number,
    }[],
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
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures?.map((brochure) => (
            <TableRow key={brochure.id}>
              <TableCell className="hidden lg:table-cell">{brochure.id}</TableCell>
              <TableCell>{brochure.title}</TableCell>
              <TableCell>
                {brochure?.images?.map((image) => (
                  <Link
                    key={image.id}
                    href={`https://mahati.xyzuan.my.id/${image.imagePath}`}
                    target="_blank"
                  >
                    <Image
                      key={image.id}
                      src={`https://mahati.xyzuan.my.id/${image.imagePath}`}
                      alt={brochure.title}
                      width={100}
                      height={100}
                      className="rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out hover:duration-500 hover:ease-in-out max-w-[100px] max-h-[100px] object-cover my-2"
                    />
                  </Link>
                ))}
              </TableCell>
              <TableCell>{formatDate(brochure.created_at)}</TableCell>
              <TableCell>{checkUpdatedAt(brochure.updated_at)}</TableCell>
              <TableCell className="min-[800px]:space-x-2 max-[800px]:space-y-2">
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"secondary"}
                  onClick={() => handleEditClick(brochure.id)}
                >
                  <Info className="text-blue-400 size-6" />
                </Button>
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"destructive"}
                  onClick={() => handleDeleteClick(brochure.id)}
                >
                  <Trash className="text-red-400 size-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedBrochureEdit && brochure && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Brochure"
          description="Update the details for the selected brochure entry."
        >
          <BrochureFormEdit
            brochure={brochure}
            refetchBrochure={refetchBrochure}
            closeDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedBrochureDelete && `Delete Brochure ID: ${selectedBrochureDelete}`}
            </AlertDialogTitle>
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