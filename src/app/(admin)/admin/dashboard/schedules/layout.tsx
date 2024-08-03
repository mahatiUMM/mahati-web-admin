import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedules | mahati.",
  description: "Built by @mahati.dev"
}

export default function ScheduleLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
    </>
  )
}