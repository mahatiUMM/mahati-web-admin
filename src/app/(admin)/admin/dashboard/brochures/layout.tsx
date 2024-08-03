import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brochures | mahati.",
  description: "Built by @mahati.dev"
}

export default function BrochureLayout({
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