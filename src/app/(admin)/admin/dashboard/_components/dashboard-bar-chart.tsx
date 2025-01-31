import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
        <CardTitle>
          Users Distribution
        </CardTitle>
        <CardDescription>
          Showing the distribution of users
        </CardDescription>
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
    </Card>
  )
}

export {
  DashboardBarChart,
}