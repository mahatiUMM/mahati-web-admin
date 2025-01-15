import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire Answers | mahati.",
  description: "Built by @mahati.dev"
}

export default function QuestionnaireAnswersLayout({
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