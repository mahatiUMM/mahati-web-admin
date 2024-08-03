import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | mahati.",
  description: "Built by @mahati.dev"
}

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
    </>
  )
}