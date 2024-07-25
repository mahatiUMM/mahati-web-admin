"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Users,
  HeartPulse,
  Album,
  BookImage,
  FileQuestion,
  BellRing,
  CalendarCheck,
  FileVideo,
  ArrowUpRight
} from "lucide-react"
import { getToken } from "@/lib/utils";
import { getBloodPressure } from "@/lib/api/blood-pressure";
import { getBookmark } from "@/lib/api/bookmark";
import { getBrochures } from "@/lib/api/brochures";
import { getQuestionnaire } from "@/lib/api/questionnaire";

export default function AdminDashboardPage() {
  const router = useRouter()
  const [pressures, setPressures] = useState<any>([])
  const [bookmarks, setBookmarks] = useState<any>([])
  const [brochures, setBrochures] = useState<any>([])
  const [questionnaires, setQuestionnaires] = useState<any>([])

  useEffect(() => {
    const token = getToken()

    if (!token) {
      router.push("/")
    } else {
      getBloodPressure(token).then((response) => {
        setPressures(response?.data);
      });
      getBookmark(token).then((response) => {
        setBookmarks(response?.data);
      });
      getBrochures(token).then((response) => {
        setBrochures(response?.data);
      });
      getQuestionnaire(token).then((response) => {
        setQuestionnaires(response?.data);
      });
    }

  }, [router])

  const allPressures = pressures?.data?.length
  const allBookmarks = bookmarks?.data?.length
  const allBrochures = brochures?.data?.length
  const allQuestionnaires = questionnaires?.data?.length

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <DashboardStats
        users={45}
        pressures={allPressures}
        bookmarks={allBookmarks}
        brochures={allBrochures}
        questionnaires={allQuestionnaires}
        reminders={573}
        schedules={573}
        videos={573}
      />
      <RecentTransactions />
      <RecentSales />
    </div>
  );
}

function DashboardStats(
  { users, pressures, bookmarks, brochures, questionnaires, reminders, schedules, videos }:
    Readonly<{
      users: number,
      pressures: number,
      bookmarks: number,
      brochures: number,
      questionnaires: number,
      reminders: number,
      schedules: number,
      videos: number,
    }>
) {
  const stats = [
    { title: "Total Users", value: "45", icon: Users, change: "+20.1% from last month" },
    { title: "Blood Pressures", value: pressures, icon: HeartPulse, change: "+180.1% from last month" },
    { title: "Bookmarks", value: bookmarks, icon: Album, change: "+19% from last month" },
    { title: "Brochures", value: brochures, icon: BookImage, change: "+201 since last hour" },
    { title: "Questionnaire", value: questionnaires, icon: FileQuestion, change: "+201 since last hour" },
    { title: "Reminders", value: "+573", icon: BellRing, change: "+201 since last hour" },
    { title: "Schedules", value: "+573", icon: CalendarCheck, change: "+201 since last hour" },
    { title: "Videos", value: "+573", icon: FileVideo, change: "+201 since last hour" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title + index} x-chunk={`dashboard-01-chunk-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value} Records</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RecentTransactions() {
  const transactions = [
    { customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Approved", date: "2023-06-23", amount: "$250.00" },
    { customer: "Olivia Smith", email: "olivia@example.com", type: "Refund", status: "Declined", date: "2023-06-24", amount: "$150.00" },
    { customer: "Noah Williams", email: "noah@example.com", type: "Subscription", status: "Approved", date: "2023-06-25", amount: "$350.00" },
    { customer: "Emma Brown", email: "emma@example.com", type: "Sale", status: "Approved", date: "2023-06-26", amount: "$450.00" },
    { customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Approved", date: "2023-06-27", amount: "$550.00" },
  ];

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions from your store.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden xl:table-column">Type</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={transaction.customer + index}>
                <TableCell>
                  <div className="font-medium">{transaction.customer}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {transaction.email}
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column">{transaction.type}</TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">{transaction.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">{transaction.date}</TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RecentSales() {
  const sales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
  ];

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {sales.map((sale, index) => (
          <div key={sale.name + index} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/mahati-logo.png" alt="Avatar" />
              <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{sale.name}</p>
              <p className="text-sm text-muted-foreground">{sale.email}</p>
            </div>
            <div className="ml-auto font-medium">{sale.amount}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}