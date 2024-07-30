"use client"

import { useState } from "react"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetBookmark, usePostBookmark } from "@/lib/hooks/useBookmarks"
import BookmarkTable from "./compoenents/bookmark-table"

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
    </div>
  )
}