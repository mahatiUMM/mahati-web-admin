"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetBookmark } from "@/lib/hooks/useBookmarks"
import { useGetAllUsers } from "@/lib/hooks/useUsers";
import BookmarkTable from "./compoenents/bookmark-table"
import { CustomDialog } from "@/components/layout/custom-dialog"
import BookmarkForm from "./compoenents/bookmark-form"

export default function AdminBookmarksPage() {
  const { data: users } = useGetAllUsers();
  const { data: bookmarks, refetch: refetchBookmark } = useGetBookmark()

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
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
      <BookmarkTable
        bookmarks={bookmarks?.data}
        fetchUsers={users?.data}
        refetchBookmark={refetchBookmark}
      />
      <CustomDialog
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        title="Add Bookmark"
        description="Enter the details for the new bookmark entry."
      >
        <BookmarkForm
          fetchUsers={users?.data}
          refetchBookmark={refetchBookmark}
          closeDialog={handleDialogClose}
        />
      </CustomDialog>
    </div>
  )
}