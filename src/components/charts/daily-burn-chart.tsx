"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { DailyVelocityDataPoint } from "@/lib/finance/chart-data";

interface DailyBurnChartProps {
  data: DailyVelocityDataPoint[];
}

export function DailyBurnChart({ data }: DailyBurnChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-zinc-900/20 animate-pulse rounded-lg" />;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as DailyVelocityDataPoint;
      return (
        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-md shadow-xl text-xs flex flex-col gap-1">
          <span className="font-semibold text-zinc-300">{point.displayDate}</span>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400">Actual Outflow:</span>
            <span className="font-bold text-amber-400">${point.actualSpend.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-zinc-500">
            <span>Safe Daily Limit:</span>
            <span>${point.safeDailyLimit.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="goldSpendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="displayDate"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#27272a" }}
          />
          <YAxis
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#27272a" }}
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={data[0]?.safeDailyLimit || 68.5}
            stroke="#eab308"
            strokeDasharray="4 4"
            label={{
              value: "Safe Limit",
              fill: "#eab308",
              fontSize: 10,
              position: "top",
            }}
          />
          <Area
            type="monotone"
            dataKey="actualSpend"
            stroke="#d4af37"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#goldSpendGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
