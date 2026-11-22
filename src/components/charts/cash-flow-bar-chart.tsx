"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { CashFlowComparisonDataPoint } from "@/lib/finance/chart-data";

interface CashFlowBarChartProps {
  data: CashFlowComparisonDataPoint[];
}

export function CashFlowBarChart({ data }: CashFlowBarChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-zinc-900/20 animate-pulse rounded-lg" />;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as CashFlowComparisonDataPoint;
      return (
        <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-md shadow-xl text-xs flex flex-col gap-1">
          <span className="font-semibold text-zinc-300">{item.name}</span>
          <span className="font-bold text-amber-400">
            ${item.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="name"
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
            tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
