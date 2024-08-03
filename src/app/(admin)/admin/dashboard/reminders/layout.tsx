import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reminders | mahati.",
  description: "Built by @mahati.dev"
}

export default function ReminderLayout({
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