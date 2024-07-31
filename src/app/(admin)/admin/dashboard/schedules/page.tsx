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
import { useGetSchedules } from "@/lib/hooks/useSchedule"

export default function AdminSchedulesPage() {
  const { data: schedules } = useGetSchedules();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Schedules" },
        ]}
      />
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">ID Reminder</TableHead>
            <TableHead className="">Time</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules?.data?.map((schedule: any) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.id}</TableCell>
              <TableCell>{schedule.reminder_id}</TableCell>
              <TableCell>{schedule.time}</TableCell>
              <TableCell>{schedule.status}</TableCell>
              <TableCell>{schedule.created_at}</TableCell>
              <TableCell>{schedule.updated_at}</TableCell>
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