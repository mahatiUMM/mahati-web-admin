import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos | mahati.",
  description: "Built by @mahati.dev"
}

export default function VideoLayout({
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