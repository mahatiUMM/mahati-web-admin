import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire Questions | mahati.",
  description: "Built by @mahati.dev"
}

export default function QuestionnaireQuestionsLayout({
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