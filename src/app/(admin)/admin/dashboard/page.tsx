"use client"

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
  ArrowUpRight,
  TrendingUp,
} from "lucide-react"
import { CartesianGrid, Bar, BarChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { useGetBloodPressures } from "@/lib/hooks/useBloodPressures";
import { useGetBookmark } from "@/lib/hooks/useBookmarks";
import { useGetBrochures } from "@/lib/hooks/useBrochure";
import { useGetQuestionnaires } from "@/lib/hooks/useQuestionnaire";
import { useGetReminders } from "@/lib/hooks/useReminder";
import { useGetSchedules } from "@/lib/hooks/useSchedule";
import { useGetVideos } from "@/lib/hooks/useVideo";

export default function AdminDashboardPage() {
  const { data: pressures } = useGetBloodPressures();
  const { data: bookmarks } = useGetBookmark();
  const { data: brochures } = useGetBrochures();
  const { data: questionnaires } = useGetQuestionnaires();
  const { data: reminders } = useGetReminders();
  const { data: schedules } = useGetSchedules();
  const { data: videos } = useGetVideos();

  const allPressures = pressures?.data?.length
  const allBookmarks = bookmarks?.data?.length
  const allBrochures = brochures?.data?.length
  const allQuestionnaires = questionnaires?.data?.length
  const allReminders = reminders?.data?.length
  const allSchedules = schedules?.data?.length
  const allVideos = videos?.data?.length

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Dashboard" },
        ]}
      />
      <DashboardStats
        users={45}
        pressures={allPressures}
        bookmarks={allBookmarks}
        brochures={allBrochures}
        questionnaires={allQuestionnaires}
        reminders={allReminders}
        schedules={allSchedules}
        videos={allVideos}
      />
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
      <RecentTransactions />
      <RecentSales />
    </div>
  );
}

function DashboardStats({
  users,
  pressures,
  bookmarks,
  brochures,
  questionnaires,
  reminders,
  schedules,
  videos,
}: Readonly<{
  users: number;
  pressures: number;
  bookmarks: number;
  brochures: number;
  questionnaires: number;
  reminders: number;
  schedules: number;
  videos: number;
}>) {
  const stats = [
    { title: "Total Users", value: "45", icon: Users, change: "+20.1% from last month" },
    { title: "Blood Pressures", value: pressures, icon: HeartPulse, change: "+180.1% from last month" },
    { title: "Bookmarks", value: bookmarks, icon: Album, change: "+19% from last month" },
    { title: "Brochures", value: brochures, icon: BookImage, change: "+201 since last hour" },
    { title: "Questionnaire", value: questionnaires, icon: FileQuestion, change: "+201 since last hour" },
    { title: "Reminders", value: reminders, icon: BellRing, change: "+201 since last hour" },
    { title: "Schedules", value: schedules, icon: CalendarCheck, change: "+201 since last hour" },
    { title: "Videos", value: videos, icon: FileVideo, change: "+201 since last hour" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 my-4 lg:my-0">
      {stats.map((stat, index) => (
        <Card key={stat.title + index}>
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
    <Card className="xl:col-span-2 mb-4 lg:mb-0">
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
    <Card>
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