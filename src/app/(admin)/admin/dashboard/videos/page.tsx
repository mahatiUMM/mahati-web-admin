"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import {
  useGetVideos,
  usePostVideo,
} from "@/lib/hooks/useVideo"
import VideoTable from "./components/video-table"
import VideoForm from "./components/video-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminVideosPage() {
  const { data: videos, refetch: refetchVideo } = useGetVideos();
  const { mutate: postVideo } = usePostVideo();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      link: e.target.link.value,
      user_id: Number(e.target.user_id.value),
    }
    await postVideo(formData);
    refetchVideo();
    handleDialogClose();
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Videos" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Video
        </Button>
      </div>
      <VideoTable videos={videos?.data} refetchVideo={refetchVideo} />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Video"
        description="Enter the details for the new video entry."
      >
        <VideoForm onSubmit={handleSubmit} onCancel={handleDialogClose} />
      </CustomDialog>
    </div>
  )
}