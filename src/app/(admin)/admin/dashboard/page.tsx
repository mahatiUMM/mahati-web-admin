"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("mahatiToken")
    if (!token) {
      router.push("/")
    }
  })

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      Admin Dashboard
    </div>
  )
}