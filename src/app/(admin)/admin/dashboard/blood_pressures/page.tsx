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
import { useGetBloodPressures } from "@/lib/hooks/useBloodPressures"

export default function AdminPressuresPage() {
  const { data: pressures } = useGetBloodPressures()

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Blood Pressures" },
        ]}
      />
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="l">Image</TableHead>
            <TableHead className="">Sistol</TableHead>
            <TableHead className="">Diastol</TableHead>
            <TableHead className="">Heartbeat</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-left">Update At</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pressures?.data?.map((pressure: any) => (
            <TableRow key={pressure.id}>
              <TableCell className="hidden lg:table-cell">{pressure.id}</TableCell>
              <TableCell>{pressure.user_id}</TableCell>
              <TableCell>{pressure.image}</TableCell>
              <TableCell>{pressure.sistol}</TableCell>
              <TableCell>{pressure.diastole}</TableCell>
              <TableCell>{pressure.heartbeat}</TableCell>
              <TableCell>{pressure.created_at}</TableCell>
              <TableCell>{pressure.updated_at}</TableCell>
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