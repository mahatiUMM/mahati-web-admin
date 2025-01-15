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
  useGetBookmarkById,
  useDeleteBookmark,
} from "@/lib/hooks/useBookmarks";
import BookmarkFormEdit from "./bookmark-edit";
import { formatDate, checkUpdatedAt } from "@/lib/utils";

export default function BookmarkTable({
  bookmarks,
  fetchUsers,
  fetchVideos,
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
  fetchUsers: any;
  fetchVideos: any;
  refetchBookmark: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBookmarkEdit, setSelectedBookmarkEdit] = useState<number | null>(null);
  const [selectedBookmarkDelete, setSelectedBookmarkDelete] = useState<number | null>(null);

  const { data: bookmark, fetchData } = useGetBookmarkById();
  const { deleteData: deleteBookmark } = useDeleteBookmark();

  const userMap = new Map(fetchUsers?.map((user: any) => [user.id, user.username]));
  const videoMap = new Map(fetchVideos?.map((video: any) => [video.id, video.title]));

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
            <TableHead>Username</TableHead>
            <TableHead>Video Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookmarks?.map((bookmark: any) => (
            <TableRow key={bookmark.id}>
              <TableCell className="hidden lg:table-cell">{bookmark.id}</TableCell>
              <TableCell>
                {userMap.get(bookmark.user_id) as string || "Unknown"}
              </TableCell>
              <TableCell>
                {videoMap.get(bookmark.video_id) as string || "Unknown"}
              </TableCell>
              <TableCell>
                {formatDate(bookmark.created_at)}
              </TableCell>
              <TableCell>
                {checkUpdatedAt(bookmark.updated_at)}
              </TableCell>
              <TableCell className="min-[800px]:space-x-2 max-[800px]:space-y-2">
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"outline"}
                  onClick={() => handleEditClick(bookmark.id)}
                >
                  <Info className="text-blue-600 dark:text-blue-400 size-6" />
                </Button>
                <Button
                  className="rounded-full p-1 size-8"
                  variant={"outline"}
                  onClick={() => handleDeleteClick(bookmark.id)}
                >
                  <Trash className="text-red-600 dark:text-red-400 size-6" />
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
            fetchUsers={fetchUsers}
            fetchVideos={fetchVideos}
            refetchBookmark={refetchBookmark}
            closeDialog={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <CustomAlert
        open={isDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        onClick={handleDeleteBookmark}
        title={`Delete Bookmark ID: ${selectedBookmarkDelete}`}
        description="Are you sure you want to delete this bookmark entry?"
      />
    </>
  )
}