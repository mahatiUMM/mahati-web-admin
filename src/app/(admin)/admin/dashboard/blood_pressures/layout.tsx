import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blood Pressure | mahati.",
  description: "Built by @mahati.dev"
}

export default function BloodPressureLayout({
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