"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetBookmark, usePostBookmark } from "@/lib/hooks/useBookmarks"
import BookmarkTable from "./compoenents/bookmark-table"
import { CustomDialog } from "@/components/layout/custom-dialog"
import BookmarkForm from "./compoenents/bookmark-form"

export default function AdminBookmarksPage() {
  const { data: bookmarks, refetch: refetchBookmark } = useGetBookmark()
  const { mutate: postBookmark } = usePostBookmark();

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = {
      user_id: parseInt(e.target.user_id.value),
      video_id: parseInt(e.target.video_id.value),
      is_bookmark: e.target.is_bookmark.checked,
    }
    await postBookmark(formData)
    refetchBookmark()
    handleDialogClose()
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <div className="flex items-center justify-between">
        <CustomBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Home" },
            { label: "Bookmarks" },
          ]}
        />
        <Button variant={"default"} onClick={handleDialogOpen}>
          Add Bookmark
        </Button>
      </div>
      <BookmarkTable bookmarks={bookmarks?.data} refetchBookmark={refetchBookmark} />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Bookmark"
        description="Enter the details for the new bookmark entry."
      >
        <BookmarkForm onSubmit={handleSubmit} onCancel={handleDialogClose} />
      </CustomDialog>
    </div>
  )
}