"use client"

import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useGetProfile } from "@/lib/hooks/useUsers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"

export default function AdminProfilePage() {
  const pathname = usePathname();
  const { data: dataProfile } = useGetProfile();

  const renderProfileLink = (href: string, label: string) => (
    <Link
      className={`mt-4 inline-flex items-center rounded-md text-sm font-medium hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted hover:underline hover:underline-offset-4 justify-start ${pathname === href ? "underline underline-offset-4" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );

  const renderProfileInput = (id: any, label: string, type: string, placeholder: string) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} readOnly className="text-white bg-transparent" />
    </div>
  );

  const renderProfileImage = (src: any, alt: any) => (
    <Image
      loading="lazy"
      crossOrigin="anonymous"
      src={src}
      alt={alt}
      width={150}
      height={150}
      className="rounded-full"
    />
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
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="refresh_token">Refresh Token</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="space-y-4">
                  <div className="flex justify-center items-center">
                    {dataProfile?.data?.photo === "" ? (
                      renderProfileImage("/mahati-logo.png", "User Profile")
                    ) : (
                      renderProfileImage(`https://mahati.xyzuan.my.id/${dataProfile?.data?.photo}`, "User Profile")
                    )}
                  </div>
                  {renderProfileInput("username", "Username", "text", dataProfile?.data?.username)}
                  {renderProfileInput("email", "Email", "email", dataProfile?.data?.email)}
                  {renderProfileInput("number", "Number", "text", dataProfile?.data?.number)}
                </div>
              </TabsContent>
              <TabsContent value="refresh_token">
                <div className="space-y-4 mt-5">
                  {dataProfile?.data?.RefreshToken?.map((data: any) => (
                    <>
                      {renderProfileInput("token", "Token", "text", data?.token)}
                      {renderProfileInput("created_at", "Created At", "text", formatDate(data?.created_at))}
                    </>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
