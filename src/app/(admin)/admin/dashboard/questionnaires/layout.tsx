import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaires | mahati.",
  description: "Built by @mahati.dev"
}

export default function QuestionnaireLayout({
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