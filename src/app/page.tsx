import CustomLineChart from "@/components/custom-line-chart";
import CustomStackedBarChart from "@/components/custom-stacked-bar-chart";
import Metrics from "@/components/metrics";
import RevenueMap from "@/components/revenue-map-section";
import { Point } from "@/components/sidebar-left";
import TopSellingSection from "@/components/top-selling-section";
import TotalSalesSection from "@/components/total-sales-section";
import React from "react";

export default function Home() {
  return (
    <div className="scrollbar-custom | overflow-y-auto p-4 md:p-7 w-full">
      <h2 className="font-semibold max-w-screen-xl mx-auto">eCommerce</h2>
      <div className="homeGridContainer">
        <section className="gridWrapper | max-w-screen-xl mx-auto pt-4 grid gap-7">
          <Metrics />
          <section className="grid-container-col-span-2 | rounded-2xl p-6 bg-primary-custom h-[264px] grid gap-2 grid-rows-[auto_1fr] ~h-full">
            <h2 className="font-semibold">Projections vs Actuals</h2>
            <CustomStackedBarChart />
          </section>
          <section className="grid-container-col-span-2 | rounded-2xl p-6 bg-primary-custom h-[380px] grid gap-2 grid-rows-[auto_1fr]">
            <div className="flex md:items-center gap-4 flex-col md:flex-row">
              <h2 className="font-semibold">Revenue</h2>
              <span className="text-foreground/20 hidden md:block">|</span>
              <div className="items-center gap-4 md:contents">
                <p className="text-sm flex items-center gap-1">
                  <Point className="bg-foreground" /> Current Week{" "}
                  <span className="font-semibold">$58,211</span>
                </p>
                <p className="text-sm flex items-center gap-1">
                  <Point className="bg-secondary-cyan-custom" /> Previous Week{" "}
                  <span className="font-semibold">$68,768</span>
                </p>
              </div>
            </div>
            <CustomLineChart />
          </section>
          <RevenueMap />
          <TopSellingSection />
          <TotalSalesSection />
        </section>
      </div>
    </div>
  );
}
