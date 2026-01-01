"use client";
import { totalSalesData } from "@/lib/constants";
import { Pie, PieChart, Tooltip } from "recharts";
import React from "react";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Sector } from "@/lib/pie-utils";

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}: PieSectorDataItem) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        cornerRadius={50}
        fill={fill}
      />
    </g>
  );
};

export default function CustomPieChart({
  isAnimationActive = true,
  chartData,
}: {
  chartData: typeof totalSalesData;
  isAnimationActive?: boolean;
}) {
  const data = chartData.map((item) => {
    return {
      name: item.source,
      value: item.amount,
      fill: `var(--chart-${item.source.toLowerCase()})`,
    };
  });
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 " />
      <PieChart
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: "150px",
          maxHeight: "80vh",
          aspectRatio: 1,
        }}
        responsive
      >
        <Tooltip defaultIndex={0} content={<></>} cursor={false} />
        <Pie
          startAngle={180}
          endAngle={540}
          data={data}
          innerRadius="75%"
          outerRadius="100%"
          cornerRadius="100%"
          fill="#8884d8"
          dataKey="value"
          stroke="none"
          activeShape={renderActiveShape}
          inactiveShape={renderActiveShape}
          paddingAngle={-5}
          isAnimationActive={isAnimationActive}
        ></Pie>
      </PieChart>
    </div>
  );
}
