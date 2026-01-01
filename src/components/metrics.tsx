import { ArrowRise } from "@/assets/svgs";
import { NumberTicker } from "@/components/ui/number-ticker";
import React from "react";

export default function Metrics() {
  return (
    <section className="grid grid-cols-2 gap-7">
      <div className="grid gap-2 p-6 rounded-2xl bg-secondary-custom dark:text-background">
        <h3 className="font-semibold">Customers</h3>
        <div className="flex items-center justify-between flexWrap">
          <p className="font-semibold text-2xl">
            <NumberTicker value={3781} />
          </p>
          <span className="flex items-center gap-1">
            +<NumberTicker value={11.01} decimalPlaces={2} />%{" "}
            <ArrowRise className="dark:*:fill-background" />
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-6 rounded-2xl bg-primary-custom">
        <h3 className="font-semibold">Orders</h3>
        <div className="flex items-center justify-between flexWrap">
          <p className="font-semibold text-2xl">
            <NumberTicker value={1219} />
          </p>
          <span className="flex items-center gap-1">
            -
            <NumberTicker value={0.03} decimalPlaces={2} />%{" "}
            <ArrowRise className="*:fill-foreground rotate-180" />
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-6 rounded-2xl bg-primary-custom">
        <h3 className="font-semibold">Revenue</h3>
        <div className="flex items-center justify-between flexWrap">
          <p className="font-semibold text-2xl">
            $<NumberTicker value={695} />
          </p>
          <span className="flex items-center gap-1">
            +<NumberTicker value={15.03} decimalPlaces={2} />% <ArrowRise />
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-6 rounded-2xl bg-secondary-purple-custom dark:text-background">
        <h3 className="font-semibold">Growth</h3>
        <div className="flex items-center justify-between flexWrap">
          <p className="font-semibold text-2xl">
            <NumberTicker value={30.1} decimalPlaces={1} />%
          </p>
          <span className="flex items-center gap-1">
            +<NumberTicker value={6.08} decimalPlaces={2} />%{" "}
            <ArrowRise className="dark:*:fill-background" />
          </span>
        </div>
      </div>
    </section>
  );
}
