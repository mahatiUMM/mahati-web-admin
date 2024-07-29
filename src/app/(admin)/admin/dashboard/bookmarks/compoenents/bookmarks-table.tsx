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
  useGetBookmark,
} from "@/lib/hooks/useBookmarks";

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
  return (
    <>
      <Table className="my-4 lg:my-0">
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
          {bookmarks?.map((bookmark: any) => (
            <TableRow key={bookmark.id}>
              <TableCell>{bookmark.id}</TableCell>
              <TableCell>{bookmark.video_id}</TableCell>
              <TableCell>{bookmark.user_id}</TableCell>
              <TableCell>
                {(bookmark.is_bookmark) ? "Yes" : "No"}
              </TableCell>
              <TableCell>{bookmark.created_at}</TableCell>
              <TableCell>{bookmark.updated_at}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Button className="rounded-full px-1 py-1" variant={"outline"}>
                  <Info className="text-blue-400 h-5 w-5" />
                </Button>
                <Button className="rounded-full px-1 py-1" variant={"outline"}>
                  <Trash className="text-red-400 h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        WIP
      </div>
    </>
  )
}