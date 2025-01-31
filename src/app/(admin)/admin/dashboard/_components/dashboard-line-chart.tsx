"use client";

import { useMemo, useState } from "react";
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
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
} from "recharts"

interface QuestionnaireHistory {
  created_at: string;
  selectedAnswer: string;
}

interface DailyCount {
  completed: number;
  pending: number;
}

interface ChartDataPoint extends DailyCount {
  date: string;
}

interface QuestionnaireHistoriesData {
  data: QuestionnaireHistory[];
}

const DashboardLineChart = ({
  questionnaireHistories
}: {
  questionnaireHistories: QuestionnaireHistoriesData;
}) => {
  const [activeChart, setActiveChart] = useState<'completed' | 'pending'>('completed');

  const chartLogData = useMemo(() => {
    if (!questionnaireHistories?.data) {
      return [];
    }

    const groupedByDate = questionnaireHistories.data.reduce((acc: Record<string, DailyCount>, curr) => {
      const date = new Date(curr.created_at).toISOString().split('T')[0];

      if (!acc[date]) {
        acc[date] = {
          completed: 0,
          pending: 0
        };
      }

      if (curr.selectedAnswer === "TP") {
        acc[date].completed++;
      } else {
        acc[date].pending++;
      }

      return acc;
    }, {});

    return Object.entries(groupedByDate).map(([date, counts]): ChartDataPoint => ({
      date,
      ...counts,
    }));
  }, [questionnaireHistories]);

  const chartLogConfig = {
    views: {
      label: "Answer Finished",
      color: "hsl(var(--chart-0))",
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            Questionnaire Statistics
          </CardTitle>
          <CardDescription>
            Showing the date of the questionnaire finished
          </CardDescription>
        </div>
        <div className="flex">
          {(["completed", "pending"] as const).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartLogConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {chartLogData.reduce((acc, curr) => acc + (curr[key] || 0), 0)}
              </span>
            </button>
          ))}
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
  );
};

export {
  DashboardLineChart,
};