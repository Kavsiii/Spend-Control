"use client";

import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CategoryDistributionDataPoint } from "@/lib/finance/chart-data";

interface CategoryDonutChartProps {
  data: CategoryDistributionDataPoint[];
}

export function CategoryDonutChart({ data }: CategoryDonutChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-zinc-900/20 animate-pulse rounded-lg" />;
  }

  if (data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center text-xs text-zinc-500 border border-zinc-800/60 rounded-lg">
        No category expenditure logged yet.
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as CategoryDistributionDataPoint;
      return (
        <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-md shadow-xl text-xs flex flex-col gap-1">
          <span className="font-semibold text-zinc-200">{item.label}</span>
          <span className="text-amber-400 font-bold">
            ${item.amount.toFixed(2)} ({item.percentage}%)
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 h-64 w-full">
      <div className="h-full w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#18181b" strokeWidth={1} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category Legend */}
      <div className="w-full sm:w-1/2 flex flex-col gap-1.5 text-xs">
        {data.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-zinc-300">{item.label}</span>
            </div>
            <span className="font-medium text-zinc-400">
              ${item.amount.toFixed(0)} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
