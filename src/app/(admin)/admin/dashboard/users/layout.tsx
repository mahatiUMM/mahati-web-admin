import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | mahati.",
  description: "Built by @mahati.dev",
};

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  )
}