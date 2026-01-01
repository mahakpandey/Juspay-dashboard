import { OrdersTable } from "@/components/orders/orders-table";
import React from "react";

export default function Page() {
  return (
    <div className="overflow-auto p-7">
      <h2 className="font-semibold">Order List</h2>
      <section className="pt-4">
        <OrdersTable />
      </section>
    </div>
  );
}
