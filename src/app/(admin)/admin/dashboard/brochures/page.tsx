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
import { useGetBrochures } from "@/lib/hooks/useBrochures"

export default function AdminBrochuresPage() {

  const { data: brochures } = useGetBrochures()

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Brochures" },
        ]}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures?.data?.map((brochure: any) => (
            <TableRow key={brochure.id}>
              <TableCell>{brochure.id}</TableCell>
              <TableCell>{brochure.title}</TableCell>
              <TableCell>{brochure.image}</TableCell>
              <TableCell>{brochure.created_at}</TableCell>
              <TableCell>{brochure.updated_at}</TableCell>
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