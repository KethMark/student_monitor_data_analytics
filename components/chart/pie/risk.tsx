"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RiskData {
  risk_level: string;
  count: number;
  fill: string;
}

const initialDataRisk: RiskData[] = [
  {
    risk_level: "High",
    count: 5604,
    fill: "var(--color-High)",
  },
  {
    risk_level: "Medium",
    count: 2220,
    fill: "var(--color-Medium)",
  },
  {
    risk_level: "Low",
    count: 2175,
    fill: "var(--color-Low)",
  },
];

const fetchRiskDistribution = async (): Promise<RiskData[]> => {
  const { data } = await axios.get("/api/pie/risk");
  return data;
};

const chartConfig = {
  High: {
    label: "High",
    color: "hsl(var(--chart-1))",
  },
  Medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  Low: {
    label: "Low",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function RiskPieComponent() {
  const { data: riskData } = useQuery({
    queryKey: ["riskDistribution"],
    queryFn: fetchRiskDistribution,
    initialData: initialDataRisk,
  });

  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(
    riskData[0].risk_level
  );

  const activeIndex = React.useMemo(
    () =>
      riskData.findIndex(
        (item) => item.risk_level === activeMonth
      ),
    [activeMonth]
  );
  const months = React.useMemo(
    () => riskData.map((item) => item.risk_level),
    []
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Gender Distribution</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={riskData}
              dataKey="count"
              nameKey="risk_level"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {riskData[activeIndex].count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Risk Level
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
