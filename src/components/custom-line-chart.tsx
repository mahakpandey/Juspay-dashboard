"use client";
import { lineChartFields, randomDataGenerator } from "@/lib/random";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CustomLineChart() {
  const randomLineChartData = useMemo(() => {
    return randomDataGenerator<{
      amt: number;
      name: string;
      pv: number; 
      uv: number;
    }>({
      fields: lineChartFields,
      n: 6,
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        style={{
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={randomLineChartData}
        margin={{
          top: 15,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          className="*:*:*:fill-foreground/40 *:*:*:text-[0.75em] *:*:text-[16px]"
          stroke=""
        />
        <YAxis
          width="auto"
          stroke=""
          className="*:*:*:fill-foreground/40 *:*:*:text-[0.75em] *:*:text-[16px]"
        />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="pv"
          className="*:stroke-secondary-cyan-custom"
          strokeWidth={3}
          strokeLinecap="round"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="uv"
          className="*:stroke-accent"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={Array.from({ length: 70 }, (_, i) =>
            i > 0 ? "5" : "400",
          ).join(" ")}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
