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
  useGetBookmarkById,
  usePutBookmark,
  useDeleteBookmark,
} from "@/lib/hooks/useBookmarks";
import BookmarkFormEdit from "./bookmark-edit";

export default function BookmarkTable({
  bookmarks,
  refetchBookmark,
}: Readonly<{
  bookmarks: {
    id: number,
    video_id: number,
    user_id: number,
    is_bookmark: boolean,
    created_at: string,
    updated_at: string,
  }[];
  refetchBookmark: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBookmarkEdit, setSelectedBookmarkEdit] = useState<number | null>(null);
  const [selectedBookmarkDelete, setSelectedBookmarkDelete] = useState<number | null>(null);

  const { data: bookmark, fetchData } = useGetBookmarkById();
  const { putData: updateBookmark } = usePutBookmark();
  const { deleteData: deleteBookmark } = useDeleteBookmark();

  const handleEditClick = (id: number) => {
    setSelectedBookmarkEdit(id);
    fetchData(id);
    setDialogOpen(true);
  };
  const handleDeleteClick = (id: number) => {
    setSelectedBookmarkDelete(id);
    setIsDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setDialogOpen(false);
    setSelectedBookmarkEdit(null);
  };
  const handleDeleteDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedBookmarkDelete(null);
  };

  const handlePutBookmark = async (formData: any) => {
    if (selectedBookmarkEdit) {
      await updateBookmark(selectedBookmarkEdit, formData);
      refetchBookmark();
      handleEditDialogClose();
    }
  }
  const handleDeleteBookmark = async () => {
    if (selectedBookmarkDelete) {
      await deleteBookmark(selectedBookmarkDelete);
      refetchBookmark();
      handleDeleteDialogClose();
    }
  }

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead>ID Video</TableHead>
            <TableHead>ID User</TableHead>
            <TableHead>Is Bookmark?</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookmarks?.map((bookmark: any) => (
            <TableRow key={bookmark.id}>
              <TableCell className="hidden lg:table-cell">{bookmark.id}</TableCell>
              <TableCell>{bookmark.video_id}</TableCell>
              <TableCell>{bookmark.user_id}</TableCell>
              <TableCell>{bookmark.is_bookmark ? "Yes" : "No"}</TableCell>
              <TableCell>{bookmark.created_at}</TableCell>
              <TableCell>{bookmark.updated_at}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Button
                  className="rounded-full px-1 py-1"
                  variant="outline"
                  onClick={() => handleEditClick(bookmark.id)}
                >
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button
                  className="rounded-full px-1 py-1"
                  variant="outline"
                  onClick={() => handleDeleteClick(bookmark.id)}
                >
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedBookmarkEdit && bookmark && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Bookmark"
          description="Enter the details for the bookmark entry."
        >
          <BookmarkFormEdit
            bookmark={bookmark}
            onSubmit={handlePutBookmark}
            onCancel={handleEditDialogClose}
          />
        </CustomDialog>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedBookmarkDelete ? `Delete Bookmark ID ${selectedBookmarkDelete}` : "Delete Bookmark"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBookmark}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}