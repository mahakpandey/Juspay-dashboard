import CountryList from "@/components/revenue-map-section/country-list";
import WorldMap from "@/components/revenue-map-section/world-map";
import React from "react";

export default function RevenueMapSection() {
  return (
    <section className="rounded-2xl p-6 bg-primary-custom grid gap-2 grid-rows-[auto_1fr_1fr] items-start h-full">
      <h2 className="font-semibold">Revenue by Location</h2>
      <WorldMap />
      <CountryList />
    </section>
  );
}
