"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, topSellingProductsData } from "@/lib/constants";
import { productFields, randomDataGenerator } from "@/lib/random";
import React, { useMemo } from "react";

export default function TopSellingTable() {
  const randomTopSellingProductsData = useMemo(() => {
    return randomDataGenerator<(typeof topSellingProductsData)[number]>({
      fields: productFields,
      n: 5,
    });
  }, []);
  return (
    <div className="mt-1 !text-xs w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs font-normal text-foreground/40">
              Name
            </TableHead>
            <TableHead className="text-xs font-normal text-foreground/40">
              Price
            </TableHead>
            <TableHead className="text-xs font-normal text-foreground/40">
              Quantity
            </TableHead>
            <TableHead className="text-xs font-normal text-foreground/40">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {randomTopSellingProductsData.map((product: Product, idx: number) => (
            <TableRow key={idx} className="border-none">
              <TableCell className="text-xs">{product.name}</TableCell>
              <TableCell className="text-xs">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell className="text-xs">{product.quantity}</TableCell>
              <TableCell className="text-xs">
                {product.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
