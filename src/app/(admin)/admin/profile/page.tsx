"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"

export default function AdminProfilePage() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("mahatiToken")
    if (!token) {
      router.push("/")
    }
  })

  return (
    <div>
      Admin Profile Page
    </div>
  )
}