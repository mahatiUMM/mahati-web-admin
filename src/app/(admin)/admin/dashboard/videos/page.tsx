"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetVideos } from "@/lib/hooks/useVideos"

export default function AdminVideosPage() {
  const { data: videos } = useGetVideos();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Videos" },
        ]}
      />
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">ID User</TableHead>
            <TableHead className="">Link</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos?.data?.map((video: any) => (
            <TableRow key={video.id}>
              <TableCell>{video.id}</TableCell>
              <TableCell>{video.user_id}</TableCell>
              <TableCell>{video.link}</TableCell>
              <TableCell>{video.created_at}</TableCell>
              <TableCell>{video.updated_at}</TableCell>
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