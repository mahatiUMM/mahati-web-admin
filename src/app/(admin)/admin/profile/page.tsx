"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminProfilePage() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("mahatiToken")
    if (!token) {
      router.push("/")
    }
  })

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "My Profile" },
        ]}
      />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <a
              className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start"
              href="/examples/forms"
            >
              Profile
            </a>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-border h-[1px] w-full"
            ></div>
            <form className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="rizkyhaksono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="mrizkyhaksono@gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input id="number" type="text" placeholder="0812345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Photo</Label>
                <Input id="number" type="file" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}