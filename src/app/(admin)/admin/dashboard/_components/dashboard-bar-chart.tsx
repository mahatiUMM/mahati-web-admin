import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
} from "recharts"

const DashboardBarChart = ({
  users
}: {
  users: any
}) => {
  const adminsData = users?.data?.filter((user: any) => user.isAdmin === true).length
  const usersData = users?.data?.filter((user: any) => user.isAdmin === false).length

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

  const chartUsers = [
    { allUser: "All Users", admins: adminsData, users: usersData },
  ]

  return (
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
  )
}

export {
  DashboardBarChart,
}