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
import { useGetReminders } from "@/lib/hooks/useReminder"

export default function AdminRemindersPage() {
  const { data: reminders } = useGetReminders();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Reminders" },
        ]}
      />
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">ID User</TableHead>
            <TableHead className="">Medicine Name</TableHead>
            <TableHead className="">Medicine Taken</TableHead>
            <TableHead className="">Medicine Total</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Cause</TableHead>
            <TableHead className="">Ukuran Obat</TableHead>
            <TableHead className="">Medicine Time</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reminders?.data?.map((reminder: any) => (
            <TableRow key={reminder.id}>
              <TableCell>{reminder.id}</TableCell>
              <TableCell>{reminder.user_id}</TableCell>
              <TableCell>{reminder.medicine_name}</TableCell>
              <TableCell>{reminder.medicine_taken}</TableCell>
              <TableCell>{reminder.medicine_total}</TableCell>
              <TableCell>{reminder.amount}</TableCell>
              <TableCell>{reminder.cause}</TableCell>
              <TableCell>{reminder.cap_size}</TableCell>
              <TableCell>{reminder.medicine_time}</TableCell>
              <TableCell>{reminder.created_at}</TableCell>
              <TableCell>{reminder.updated_at}</TableCell>
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