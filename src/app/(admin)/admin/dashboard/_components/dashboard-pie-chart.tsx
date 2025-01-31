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
} from "@/components/ui/chart"
import {
  Pie,
  PieChart,
  LabelList,
} from "recharts"

const DashboardPieChart = ({
  medicineTaken
}: {
  medicineTaken: any
}) => {
  const processedData = medicineTaken?.data.reduce((acc: any, item: any) => {
    const { medicine_taken, amount } = item.reminder;
    const remaining = amount - medicine_taken;

    return {
      taken: acc.taken + medicine_taken,
      remaining: acc.remaining + remaining
    };
  }, { taken: 0, remaining: 0 });

  const chartData = [
    {
      status: "Taken",
      count: processedData?.taken || 0,
      fill: "hsl(var(--chart-1))"
    },
    {
      status: "Remaining",
      count: processedData?.remaining || 0,
      fill: "hsl(var(--chart-2))"
    }
  ];

  const chartConfig = {
    count: {
      label: "Count",
    },
    taken: {
      label: "Taken",
      color: "hsl(var(--chart-1))",
    },
    remaining: {
      label: "Remaining",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle>
          Medicine Distribution
        </CardTitle>
        <CardDescription>
          Distribution of taken vs remaining medicines
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-[700px]:h-[300px] h-[500px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) =>
                  value.charAt(0).toUpperCase() + value.slice(1)
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { DashboardPieChart }