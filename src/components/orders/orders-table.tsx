"use client";
import React from "react";

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Point } from "@/components/sidebar-left";
import {
  ArrowsUpDown,
  Calendar,
  Filter,
  Plus,
  SearchIcon,
} from "@/assets/svgs";
import Image from "@/components/ui/image";
import { getRandomOrders } from "@/lib/random";
import { useDebounce } from "@/hooks/use-debounce";

const ITEMS_PER_PAGE = 10;

const statusColors: Record<string, string> = {
  "In Progress": "text-[hsl(238,51%,70%,1)]",
  Complete: "text-[hsl(158,39%,47%,1)]",
  Pending: "text-[hsl(201,59%,59%,1)]",
  Approved: "text-[hsl(40,100%,67%,1)]",
  Rejected: "text-foreground/40",
};

const statusPointColors: Record<string, string> = {
  "In Progress": "bg-[hsl(238,51%,70%,1)]",
  Complete: "bg-[hsl(158,39%,47%,1)]",
  Pending: "bg-[hsl(201,59%,59%,1)]",
  Approved: "bg-[hsl(40,100%,67%,1)]",
  Rejected: "bg-foreground/40",
};

// const getInitials = (name: string) => {
// 	return name
// 		.split(" ")
// 		.map((n) => n[0])
// 		.join("")
// 		.toUpperCase()
// }

export function OrdersTable() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  const tableData = useMemo(() => {
    return getRandomOrders();
  }, []);
  const filteredData = useMemo(() => {
    return tableData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );
  }, [debouncedSearch, tableData]);

  const { data: currentPageItems = [] } = useQuery({
    queryKey: ["orders", debouncedSearch, currentPage],
    queryFn: () => {
      const start = currentPage * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredData.slice(start, end);
    },
  });

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  }, [filteredData]);

  const toggleRow = useCallback((id: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (
      selectedRows.size === currentPageItems.length &&
      currentPageItems.length > 0
    ) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentPageItems.map((item) => item.Id)));
    }
  }, [currentPageItems, selectedRows.size]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = ITEMS_PER_PAGE;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible);

    if (endPage - startPage < maxVisible) {
      startPage = Math.max(0, endPage - maxVisible);
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-2 rounded-lg bg-primary-custom">
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent hover:bg-foreground/10"
            title="Add New Order"
          >
            <Plus />
          </Button>
          <Button
            className="bg-transparent hover:bg-foreground/10"
            title="Filter Orders"
          >
            <Filter />
          </Button>
          <Button
            className="bg-transparent hover:bg-foreground/10"
            title="Sort Orders"
          >
            <ArrowsUpDown />
          </Button>
        </div>
        <div className="relative bg-background rounded-xl">
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-2 *:fill-foreground" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedRows(new Set());
              setCurrentPage(0);
            }}
            className="max-w-xs pl-8 border-foreground/10 !bg-transparent rounded-xl"
          />
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow className="border-foreground/20">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.size === currentPageItems.length &&
                    currentPageItems.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">
                User
              </TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">
                Project
              </TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">
                Address
              </TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">
                Date
              </TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageItems.map((item, idx) => (
              <TableRow
                key={item.Id + idx}
                className="!border-b !border-foreground/5 text-xs"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(item.Id)}
                    onCheckedChange={() => toggleRow(item.Id)}
                  />
                </TableCell>
                <TableCell className="">{item.Id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      alt={item.User}
                      src={`/user_${(idx % 11) + 1}.png`}
                      className="size-6 rounded-full"
                    />
                    <span>{item.User}</span>
                  </div>
                </TableCell>
                <TableCell>{item.Project}</TableCell>
                <TableCell>{item.Address}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Calendar />
                  {item.Date}
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      statusColors[item.Status],
                      "flex items-center gap-1",
                    )}
                  >
                    <Point className={statusPointColors[item.Status]} />
                    {item.Status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="text-foreground hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(page)}
            className={cn("min-w-10 rounded-lg", {
              "bg-foreground/5": currentPage === page,
            })}
          >
            {page + 1}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
          }
          disabled={currentPage === totalPages - 1}
          className="text-foreground hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
