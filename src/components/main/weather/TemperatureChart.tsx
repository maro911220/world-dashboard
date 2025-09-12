"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

/* 기온 예보 차트 */
export default function TemperatureChart({
  chartData,
}: {
  chartData: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
  }>;
}) {
  // 데이터가 없을 경우
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="content-card chart-card">
        <h3 className="chart-title">기온 예보</h3>
        <div className="chart-empty-state w-full h-[250px] flex items-center justify-center text-muted-foreground">
          기온 데이터가 없습니다
        </div>
      </Card>
    );
  }

  return (
    <Card className="content-card chart-card">
      <h3 className="chart-title">기온 예보</h3>
      <ChartContainer
        config={{
          maxTemp: { label: "최고기온", color: "var(--chart-1)" },
          minTemp: { label: "최저기온", color: "var(--chart-2)" },
        }}
        className="w-full h-[250px]"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          aria-label="시간대별 최고기온과 최저기온 예보 라인 차트"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--sidebar-border)" />
          <XAxis
            dataKey="date"
            aria-label="시간"
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(date) => date.split(" ")[1]}
          />
          <YAxis
            width={40}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            aria-label="온도 (°C)"
            domain={["auto", "auto"]}
            tickFormatter={(value) => `${value}°`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dot={false}
            strokeWidth={4}
            type="monotone"
            dataKey="maxTemp"
            aria-label="최고기온"
            stroke="var(--color-maxTemp)"
          />
          <Line
            dot={false}
            strokeWidth={4}
            type="monotone"
            dataKey="minTemp"
            aria-label="최저기온"
            stroke="var(--color-minTemp)"
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}
