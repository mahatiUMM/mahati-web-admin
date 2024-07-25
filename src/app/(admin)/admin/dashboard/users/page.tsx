import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Users" },
        ]}
      />
    </div>
  )
}