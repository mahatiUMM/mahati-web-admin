"use client"

import { usePathname } from "next/navigation"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  usePutProfile,
  useGetProfile,
} from "@/lib/hooks/useUsers"

export default function AdminProfileEditPage() {
  const pathname = usePathname();
  const { data: dataProfile } = useGetProfile();
  const { putData: putProfile } = usePutProfile();

  const renderProfileLink = (href: string, label: string) => (
    <Link
      className={`inline-flex items-center rounded-md text-sm font-medium hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted hover:underline hover:underline-offset-4 justify-start ${pathname === href ? "underline underline-offset-4" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );

  const renderProfileImage = (src: any, alt: any) => (
    <Image
      loading="lazy"
      crossOrigin="anonymous"
      src={src}
      alt={alt}
      width={100}
      height={100}
      className="rounded-full"
    />
  );

  const renderProfileInput = (id: any, label: string, type: string, placeholder: string) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} className="text-white bg-transparent" />
    </div>
  );

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
            {renderProfileLink("/admin/profile", "Profile")}
            {renderProfileLink("/admin/profile/edit", "Edit Profile")}
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
            <div className="shrink-0 bg-border h-[1px] w-full" role="none"></div>
            <form className="space-y-8">
              {renderProfileInput("username", "Username", "text", dataProfile?.data?.username)}
              {renderProfileInput("email", "Email", "email", dataProfile?.data?.email)}
              {renderProfileInput("number", "Number", "text", dataProfile?.data?.number)}
              {renderProfileInput("image", "Image", "file", dataProfile?.data?.image)}
              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                {dataProfile?.data?.photo === "" ? (
                  renderProfileImage("/mahati-logo.png", "User Profile")
                ) : (
                  renderProfileImage(dataProfile?.data?.photo, "User Profile")
                )}
              </div>
              <Button variant={"default"}>
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}