import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  useGetVideoById,
  usePutVideo,
  useDeleteVideo,
} from "@/lib/hooks/useVideo";
import { useGetAllUsers } from "@/lib/hooks/useUsers"
import VideoFormEdit from "./video-edit";

export default function VideoTable({
  videos,
  refetchVideo,
}: Readonly<{
  videos: {
    id: number,
    link: string,
    user_id: number,
    title: string,
    author_name: string,
    author_url: string,
    thumbnail_url: string,
    created_at: string,
    updated_at: string,
  }[];
  refetchVideo: () => void,
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVideoEdit, setSelectedVideoEdit] = useState<number | null>(null);
  const [selectedVideoDelete, setSelectedVideoDelete] = useState<number | null>(null);

  const { data: users } = useGetAllUsers();
  const { data: video, fetchData } = useGetVideoById();
  const { putData: updateVideo } = usePutVideo();
  const { deleteData: deleteVideo } = useDeleteVideo();

  const userMap = new Map(users?.data?.map((user: any) => [user.id, user.username]));

  const handleEditClick = (id: number) => {
    setSelectedVideoEdit(id);
    fetchData(id);
    setDialogOpen(true);
  }

  const handleDeleteClick = (id: number) => {
    setSelectedVideoDelete(id);
    setIsDialogOpen(true);
  }

  const handleEditDialogClose = () => {
    setSelectedVideoEdit(null);
    setDialogOpen(false);
  }

  const handleDeleteDialogClose = () => {
    setSelectedVideoDelete(null);
    setIsDialogOpen(false);
  }

  const handlePutVideo = async (formData: any) => {
    if (selectedVideoEdit) {
      await updateVideo(selectedVideoEdit, formData);
      refetchVideo();
      handleEditDialogClose();
    }
  }

  const handleDeleteVideo = async () => {
    if (selectedVideoDelete) {
      await deleteVideo(selectedVideoDelete);
      refetchVideo();
      handleDeleteDialogClose();
    }
  }

  return (
    <>
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">User ID</TableHead>
            <TableHead className="">Link</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Thumbnail URL</TableHead>
            <TableHead className="">Author Name</TableHead>
            <TableHead className="">Author URL</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos?.map((video) => (
            <TableRow key={video.id}>
              <TableCell>{video.id}</TableCell>
              <TableCell>
                {userMap.get(video.user_id) as string || 'Unknown User'}
              </TableCell>
              <TableCell>
                <Link href={video.link} target="_blank">
                  {video.link}
                </Link>
              </TableCell>
              <TableCell>{video.title}</TableCell>
              <TableCell>
                <Link href={video.thumbnail_url} target="_blank">
                  <Image
                    src={video.thumbnail_url}
                    width={400}
                    height={400}
                    className="rounded-lg"
                    alt={video.thumbnail_url}
                  />
                </Link>
              </TableCell>
              <TableCell>{video.author_name}</TableCell>
              <TableCell>
                <Link href={video.author_url} target="_blank">
                  {video.author_url}
                </Link>
              </TableCell>
              <TableCell>{video.created_at}</TableCell>
              <TableCell>{video.updated_at}</TableCell>
              <TableCell className="min-[800px]:space-x-2 max-[800px]:space-y-2">
                <Button
                  className="rounded-full p-2 size-10"
                  variant={"secondary"}
                  onClick={() => handleEditClick(video.id)}
                >
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button
                  className="rounded-full p-2 size-10"
                  variant={"destructive"}
                  onClick={() => handleDeleteClick(video.id)}
                >
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedVideoEdit && video && (
        <CustomDialog
          isOpen={dialogOpen}
          onClose={handleEditDialogClose}
          title="Edit Video"
          description="Update the details for the video entry."
        >
          <VideoFormEdit
            video={video}
            onSubmit={handlePutVideo}
            onCancel={handleEditDialogClose}
          />
        </CustomDialog>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedVideoDelete && `Delete Brochure ID: ${selectedVideoDelete}`}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this brochure?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDeleteVideo}>Yes</AlertDialogAction>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>No</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}