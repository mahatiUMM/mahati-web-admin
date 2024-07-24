"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getBloodPressure } from "@/lib/api/blood-pressure"
import { getToken } from "@/lib/utils"

export default function AdminPressuresPage() {
  const [pressures, setPressures] = useState<any>([])

  useEffect(() => {
    const token = getToken()
    if (token) {
      getBloodPressure(token).then((response) => {
        setPressures(response?.data)
      })
    }
  }, [])

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      Admin Dashboard Blood Pressures
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden lg:table-cell">ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="hidden sm:table-cell">Image</TableHead>
            <TableHead className="">Sistol</TableHead>
            <TableHead className="hidden md:table-cell">Diastol</TableHead>
            <TableHead className="text-left hidden md:table-cell">Heartbeat</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-left">Update At</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pressures?.data?.map((pressure: any) => (
            <TableRow key={pressure.id}>
              <TableCell>{pressure.id}</TableCell>
              <TableCell>{pressure.user_id}</TableCell>
              <TableCell>{pressure.image}</TableCell>
              <TableCell>{pressure.sistol}</TableCell>
              <TableCell>{pressure.diastole}</TableCell>
              <TableCell>{pressure.heartbeat}</TableCell>
              <TableCell>{pressure.created_at}</TableCell>
              <TableCell>{pressure.updated_at}</TableCell>
              <TableCell>
                <button>
                  Action
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}