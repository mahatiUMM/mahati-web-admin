"use client"

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Users,
  HeartPulse,
  Album,
  BookImage,
  FileQuestion,
  BellRing,
  CalendarCheck,
  FileVideo,
} from "lucide-react"
import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  Pie,
  PieChart,
  LabelList,
  Line,
  LineChart,
} from "recharts"
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

  const allPressures = pressures?.data?.data?.length
  const allBookmarks = bookmarks?.data?.length
  const allBrochures = brochures?.data?.length
  const allQuestionnaires = questionnaires?.data?.length
  const allReminders = reminders?.data?.length
  const allSchedules = schedules?.data?.length
  const allVideos = videos?.data?.length
  const allUsers = users?.data?.length

  const adminsData = users?.data?.filter((user: any) => user.isAdmin === true).length
  const usersData = users?.data?.filter((user: any) => user.isAdmin === false).length

  const chartUsers = [
    { allUser: "All Users", admins: adminsData, users: usersData },
  ]

  const chartAllData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ]

  const chartUsersConfig = {
    admins: {
      label: "Admins",
      color: "#2563eb",
    },
    users: {
      label: "Users",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  const chartAllConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  const chartLogData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
  ]

  const chartLogConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  const [activeChart, setActiveChart] = useState<keyof typeof chartLogConfig>("desktop")

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
      <div className="grid grid-cols-3 space-x-4 max-[1200px]:grid-cols-1 max-[1200px]:space-y-4 max-[1200px]:space-x-0">
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Users</CardTitle>
            <CardDescription>January - {new Date().toLocaleString('default', { month: 'long' })} 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartUsersConfig} className="h-[400px] w-full">
              <BarChart accessibilityLayer data={chartUsers}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="allUser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="admins" fill="var(--color-admins)" radius={4} />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last {new Date().toLocaleString('default', { month: 'long' })}
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="items-start pb-0">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartAllConfig}
              className="mx-auto aspect-square h-[400px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                />
                <Pie
                  data={chartAllData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <LabelList
                    dataKey="browser"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: keyof typeof chartAllConfig) =>
                      chartAllConfig[value]?.label
                    }
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last {new Date().toLocaleString('default', { month: 'long' })}
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Line Chart - Log Data</CardTitle>
              <CardDescription>
                Showing total log for the last {`January until ${new Date().toLocaleString('default', { month: 'long' })}`}
              </CardDescription>
            </div>
            <div className="flex">
              {["desktop", "mobile"].map((key) => {
                const chart = key as keyof typeof chartLogConfig
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartLogConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {chartLogData.reduce((acc: any, curr: any) => acc + curr[chart], 0)}
                    </span>
                  </button>
                )
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartLogConfig}
              className="aspect-auto h-[400px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={chartLogData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      }}
                    />
                  }
                />
                <Line
                  dataKey={activeChart}
                  type="monotone"
                  stroke={`var(--color-${activeChart})`}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
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
    <div className="grid gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-4 my-4 lg:my-0 max-[766px]:grid-cols-2">
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