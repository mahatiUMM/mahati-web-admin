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
  Users,
  HeartPulse,
  Album,
  BookImage,
  FileQuestion,
  BellRing,
  CalendarCheck,
  FileVideo,
  ArrowUpRight,
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
import { useGetAllUsers } from "@/lib/hooks/useUsers";

export default function AdminDashboardPage() {
  const { data: pressures } = useGetBloodPressures();
  const { data: bookmarks } = useGetBookmark();
  const { data: brochures } = useGetBrochures();
  const { data: questionnaires } = useGetQuestionnaires();
  const { data: reminders } = useGetReminders();
  const { data: schedules } = useGetSchedules();
  const { data: users } = useGetAllUsers();
  const { data: videos } = useGetVideos();

  const allPressures = pressures?.data?.length
  const allBookmarks = bookmarks?.data?.length
  const allBrochures = brochures?.data?.length
  const allQuestionnaires = questionnaires?.data?.length
  const allReminders = reminders?.data?.length
  const allSchedules = schedules?.data?.length
  const allVideos = videos?.data?.length
  const allUsers = users?.data?.length

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
        users={allUsers}
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
      <RecentUsers />
      <RecentBloodPressures />
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
    { title: "Total Users", value: users, icon: Users },
    { title: "Blood Pressures", value: pressures, icon: HeartPulse },
    { title: "Bookmarks", value: bookmarks, icon: Album },
    { title: "Brochures", value: brochures, icon: BookImage },
    { title: "Questionnaire", value: questionnaires, icon: FileQuestion },
    { title: "Reminders", value: reminders, icon: BellRing },
    { title: "Schedules", value: schedules, icon: CalendarCheck },
    { title: "Videos", value: videos, icon: FileVideo },
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RecentUsers() {
  const { data: users } = useGetAllUsers();

  return (
    <Card className="xl:col-span-2 mb-4 lg:mb-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users and their datas.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/admin/dashboard/users">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">ID</TableHead>
              <TableHead className="text-left">Username</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Admin</TableHead>
              <TableHead className="text-left">Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.map((user: any, index: number) => (
              <TableRow key={user.id + index}>
                <TableCell className="text-left">{user.id}</TableCell>
                <TableCell className="text-left">{user.username}</TableCell>
                <TableCell className="text-left">{user.email}</TableCell>
                <TableCell className="text-left">
                  <Badge variant={user.isAdmin ? "default" : "secondary"}>
                    {user.isAdmin ? "Admin" : "User"}
                  </Badge>
                </TableCell>
                <TableCell className="text-left">{user.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RecentBloodPressures() {
  const { data: pressures } = useGetBloodPressures();
  const { data: users } = useGetAllUsers();

  const userMap = new Map(users?.data?.map((user: any) => [user.id, user.username]));

  return (
    <Card className="xl:col-span-2 mb-4 lg:mb-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Blood Pressures</CardTitle>
          <CardDescription>A list of all blood pressures and their datas.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/admin/dashboard/blood_pressures">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">ID</TableHead>
              <TableHead className="text-left">User ID</TableHead>
              <TableHead className="text-left">Diastole</TableHead>
              <TableHead className="text-left">Sistol</TableHead>
              <TableHead className="text-left">Heartbeat</TableHead>
              <TableHead className="text-left">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pressures?.data?.map((pressure: any, index: number) => (
              <TableRow key={pressure.id + index}>
                <TableCell className="text-left">{pressure.id}</TableCell>
                <TableCell className="text-left">{userMap.get(pressure.user_id) as string || 'Unknown User'}</TableCell>
                <TableCell className="text-left">{pressure.diastole}</TableCell>
                <TableCell className="text-left">{pressure.sistol}</TableCell>
                <TableCell className="text-left">{pressure.heartbeat}</TableCell>
                <TableCell className="text-left">{pressure.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}