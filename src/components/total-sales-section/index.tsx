"use client";
import { Point } from "@/components/sidebar-left";
import CustomPieChart from "@/components/total-sales-section/custom-pie-chart";
import { totalSalesData } from "@/lib/constants";
import { randomDataGenerator, sources, totalSalesFields } from "@/lib/random";
import React, { useMemo } from "react";

export default function TotalSalesSection() {
  const randomTotalSalesData = useMemo(() => {
    return randomDataGenerator({
      fields: totalSalesFields,
      n: 4,
    }).map((item, idx) => ({
      ...item,
      source: sources[idx % sources.length],
    })) as typeof totalSalesData;
  }, []);
  return (
    <section className="rounded-2xl p-6 grid gap-4 bg-primary-custom">
      <h2 className="font-semibold">Total Sales</h2>
      <CustomPieChart chartData={randomTotalSalesData} />
      <div className="grid gap-3">
        {randomTotalSalesData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <h4 className="flex items-center gap-1">
              <Point
                style={{
                  backgroundColor: `var(--chart-${item.source.toLowerCase()})`,
                }}
              />{" "}
              {item.source}
            </h4>
            <p>${item.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
