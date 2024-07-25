"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { getBookmark } from "@/lib/api/bookmark"
import { getToken } from "@/lib/utils"

export default function AdminBookmarksPage() {
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<any>([])

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/");
    } else {
      getBookmark(token).then((response) => setBookmarks(response?.data));
    };
  }, [router])

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Bookmarks" },
        ]}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">ID Video</TableHead>
            <TableHead className="">ID User</TableHead>
            <TableHead className="">Is Bookmark?</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookmarks?.data?.map((bookmark: any) => (
            <TableRow key={bookmark.id}>
              <TableCell>{bookmark.id}</TableCell>
              <TableCell>{bookmark.video_id}</TableCell>
              <TableCell>{bookmark.user_id}</TableCell>
              <TableCell>
                {(bookmark.is_bookmark) ? "Yes" : "No"}
              </TableCell>
              <TableCell>{bookmark.created_at}</TableCell>
              <TableCell>{bookmark.updated_at}</TableCell>
              <TableCell>
                <Button
                  variant={"outline"}
                >
                  i
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}