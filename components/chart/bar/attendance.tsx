"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type ConditionData = {
  condition: "present" | "absent" | "late";
  count: number;
  fill: string;
};

const initialDataAttendance: ConditionData[] = [
  {
    condition: "present",
    count: 3313,
    fill: "var(--color-present)",
  },
  {
    condition: "absent",
    count: 3340,
    fill: "var(--color-absent)",
  },
  {
    condition: "late",
    count: 3346,
    fill: "var(--color-late)",
  },
];

const fetchAttendance = async (): Promise<ConditionData[]> => {
  const { data } = await axios.get("/api/bar/attendance");
  return data;
};

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  late: {
    label: "Late",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function AttendanceComponent() {
  const { data: AttenceData } = useQuery({
    queryKey: ["Attendance"],
    queryFn: fetchAttendance,
    initialData: initialDataAttendance,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Conditions Prevalence</CardTitle>
        <CardDescription>2014 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={AttenceData}
            layout="vertical"
            margin={{
              left: 26,
              right: 14,
            }}
          >
            <YAxis
              dataKey="condition"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5}>
              <LabelList
                position="right"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total medical conditions for the last january 2014 - 2024
        </div>
      </CardFooter>
    </Card>
  );
}
