import TopSellingTable from "@/components/top-selling-section/top-selling-table";
import React from "react";

export default function TopSellingSection() {
  return (
    <section className="grid-container-col-span-2 | rounded-2xl p-6 bg-primary-custom grid grid-rows-[auto_1fr]">
      <h2 className="font-semibold">Top Selling Products</h2>
      <TopSellingTable />
    </section>
  );
}
