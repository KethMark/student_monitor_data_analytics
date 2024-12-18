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
  condition: "low" | "high" | "medium";
  count: number;
  fill: string;
};

const initialDataRisk: ConditionData[] = [
  {
    condition: "low",
    count: 6.96,
    fill: "var(--color-low)",
  },
  {
    condition: "high",
    count: 7.02,
    fill: "var(--color-high)",
  },
  {
    condition: "medium",
    count: 6.97,
    fill: "var(--color-medium)",
  },
];

const fetchRisk = async (): Promise<ConditionData[]> => {
  const { data } = await axios.get("/api/bar/risk");
  return data;
};

const chartConfig = {
  low: {
    label: "Low",
    color: "hsl(var(--chart-1))",
  },
  high: {
    label: "High",
    color: "hsl(var(--chart-2))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function RiskComponent() {
  const { data: RiskData } = useQuery({
    queryKey: ["Risk"],
    queryFn: fetchRisk,
    initialData: initialDataRisk,
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
            data={RiskData}
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
