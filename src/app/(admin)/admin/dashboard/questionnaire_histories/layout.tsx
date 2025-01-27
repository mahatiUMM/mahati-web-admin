import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire Histories | mahati.",
  description: "Built by @mahati.dev"
}

export default function QuestionnaireHistoriesLayout({
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