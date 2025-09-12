"use client";

import {
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

/* 강수량 차트 */
export default function PrecipitationChart({
  chartData,
}: {
  chartData: Array<{ date: string; precipitation: number }>;
}) {
  // 데이터가 없을 경우
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="content-card chart-card">
        <h3 className="chart-title">강수량 예보</h3>
        <div className="chart-empty-state w-full h-[250px] flex items-center justify-center text-muted-foreground">
          강수량 데이터가 없습니다
        </div>
      </Card>
    );
  }

  return (
    <Card className="content-card chart-card">
      <h3 className="chart-title">강수량 예보</h3>
      <ChartContainer
        className="w-full h-[250px]"
        config={{ precipitation: { label: "강수량", color: "var(--chart-2)" } }}
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          aria-label="시간대별 강수량 예보 막대 차트"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="var(--sidebar-border)"
          />

          <XAxis
            dataKey="date"
            aria-label="시간"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(date) => date.split(" ")[1]}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            aria-label="강수량 (mm)"
            tickFormatter={(value) => `${value}mm`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            radius={8}
            dataKey="precipitation"
            aria-label="강수량 막대"
            fill="var(--color-precipitation)"
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
