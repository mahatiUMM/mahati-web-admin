"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { useGetQuestionnaire } from "@/lib/hooks/useQuestionnaire"

export default function AdminQuestionnairesPage() {
  const { data: questionnaires } = useGetQuestionnaire();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Questionnaires" },
        ]}
      />
      <Table className="my-4 lg:my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Description</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Updated At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questionnaires?.data?.map((questionnaire: any) => (
            <TableRow key={questionnaire.id}>
              <TableCell>{questionnaire.id}</TableCell>
              <TableCell>{questionnaire.type}</TableCell>
              <TableCell>{questionnaire.image}</TableCell>
              <TableCell>{questionnaire.title}</TableCell>
              <TableCell>{questionnaire.description}</TableCell>
              <TableCell>{questionnaire.created_at}</TableCell>
              <TableCell>{questionnaire.updated_at}</TableCell>
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