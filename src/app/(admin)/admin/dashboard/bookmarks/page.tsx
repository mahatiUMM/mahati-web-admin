"use client"

import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useGetBookmark, usePostBookmark } from "@/lib/hooks/useBookmarks"
import BookmarkTable from "./compoenents/bookmarks-table"

export default function AdminBookmarksPage() {
  const { data: bookmarks, refetch: refetchBookmark } = useGetBookmark()
  const { mutate: postBookmark } = usePostBookmark();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Bookmarks" },
        ]}
      />
      <BookmarkTable bookmarks={bookmarks?.data} refetchBookmark={refetchBookmark} />
    </div>
  )
}