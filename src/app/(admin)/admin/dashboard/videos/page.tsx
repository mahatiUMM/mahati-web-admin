"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetVideos } from "@/lib/hooks/useVideo"
import { useGetAllUsers } from "@/lib/hooks/useUsers"
import VideoTable from "./_components/video-table"
import VideoForm from "./_components/video-form"
import { CustomDialog } from "@/components/layout/custom-dialog"

export default function AdminVideosPage() {
  const { data: users } = useGetAllUsers();
  const { data: videos, refetch: refetchVideo } = useGetVideos();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
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
      <VideoTable
        videos={videos?.data}
        refetchVideo={refetchVideo}
      />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Video"
        description="Enter the details for the new video entry."
      >
        <VideoForm
          fetchUsers={users?.data}
          refetchVideo={refetchVideo}
          closeDialog={handleDialogClose}
        />
      </CustomDialog>
    </div>
  )
}