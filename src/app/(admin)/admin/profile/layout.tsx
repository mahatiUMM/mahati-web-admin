import AdminHeader from "@/components/layout/admin-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Profile | mahati.",
  description: "Built by @mahati.dev",
};

export default function AdminProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/80 dark:bg-muted/40">
      <AdminHeader />
      {children}
    </div>
  )
}