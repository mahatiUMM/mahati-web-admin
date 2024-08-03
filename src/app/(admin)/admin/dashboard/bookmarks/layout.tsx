import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks | mahati.",
  description: "Built by @mahati.dev"
}

export default function BookmarkLayout({
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