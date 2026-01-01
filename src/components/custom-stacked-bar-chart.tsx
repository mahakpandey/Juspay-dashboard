"use client";
import { stackedBarChartData } from "@/lib/constants";
import { randomDataGenerator, stackedBarChartFields } from "@/lib/random";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  BarProps,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";


const getPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const r = Math.min(radius, width / 2);
  return `
    M${x},${y + height}
    V${y + r}
    A${r},${r},0,0,1,${x + r},${y}
    H${x + width - r}
    A${r},${r},0,0,1,${x + width},${y + r}
    V${y + height}
    Z
  `;
};

const RoundedBar = (props: BarProps) => {
  const { fill, x, y, width, height } = props;

  const cornerRadius = 4;

  return (
    <path
      d={getPath(
        x as number,
        y as number,
        width as number,
        height as number,
        cornerRadius,
      )}
      stroke="none"
      fill={fill}
    />
  );
};
export default function CustomStackedBarChart() {
  const { theme } = useTheme();

  const randomStackedBarChartData = useMemo(() => {
    return randomDataGenerator<{
      amt: number;
      name: string;
      pv: number;
      uv: number;
    }>({
      fields: stackedBarChartFields,
      n: 6,
    }) as typeof stackedBarChartData;
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={randomStackedBarChartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        maxBarSize={25}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          className="*:*:*:fill-foreground/40 *:*:*:text-[0.75em] *:*:text-[16px]"
          stroke=""
          tick={{ fill: theme === "dark" ? "#ffffff" : "#000000" }}
        />
        <YAxis
          className="*:*:*:fill-foreground/40 *:*:*:text-[0.75em] *:*:text-[16px]"
          stroke=""
          tick={{ fill: theme === "dark" ? "#ffffff" : "#000000" }}
        />
        <Tooltip />
        <Bar dataKey="pv" stackId="a" className="fill-secondary-cyan-custom" />
        <Bar
          dataKey="uv"
          stackId="a"
          className="fill-secondary-cyan-custom/50"
          shape={RoundedBar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
