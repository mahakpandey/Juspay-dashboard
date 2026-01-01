import {
  BookOpen,
  ChartPieSlice,
  Chats,
  FolderOpen,
  Notebook,
  ProfileBadge,
  ProfileCard,
  ShoppingBagOpen,
  UsersThree,
} from "@/assets/svgs";
import React from "react";

export const dashboardArray = [
  {
    name: "Default",
    icon: <ChartPieSlice />,
    path: "/",
    showDropdown: false,
  },
  {
    name: "eCommerce",
    icon: <ShoppingBagOpen />,
    path: "/orders",
    showDropdown: true,
  },
  {
    name: "Projects",
    icon: <FolderOpen />,
    path: "/project",
    showDropdown: true,
  },
  {
    name: "Online Courses",
    icon: <BookOpen />,
    path: "/online-courses",
    showDropdown: true,
  },
] as const;
export const pagesArray = [
  {
    name: "User Profile",
    icon: <ProfileBadge />,
    path: "/user-profile",
  },
  {
    name: "Account",
    icon: <ProfileCard />,
    path: "/account",
  },
  {
    name: "Corporate",
    icon: <UsersThree />,
    path: "/corporate",
  },
  {
    name: "Blog",
    icon: <Notebook />,
    path: "/blog",
  },
  {
    name: "Social",
    icon: <Chats />,
    path: "/social",
  },
] as const;
export const dropdownOptions = [
  "Overview",
  "Projects",
  "Campaigns",
  "Documents",
  "Followers",
] as const;

export type Contact = {
  firstName: string;
  lastName: string;
};

export const contacts = [
  "Natali Craig",
  "Drew Cano",
  "Orlando Diggs",
  "Andi Lane",
  "Kate Morrison",
  "Koray Okumus",
];

export const stackedBarChartData = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

export const lineChartData = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

export const revenueByLocation = [
  {
    location: "New York",
    revenue: 72000,
  },
  {
    location: "San Francisco",
    revenue: 39000,
  },
  {
    location: "Sydney",
    revenue: 25000,
  },
  {
    location: "Singapore",
    revenue: 61000,
  },
];

export interface Notification {
  message: string;
  time: Date;
  type: "bug" | "user" | "subscription";
}

export const notifications: Notification[] = [
  {
    type: "bug",
    message: "You have a bug that needs to be fixed.",
    time: new Date(),
  },
  {
    type: "user",
    message: "New user registered",
    time: new Date(),
  },
  {
    type: "bug",
    message: "You have a bug that needs to be fixed.",
    time: new Date(),
  },
  {
    type: "subscription",
    message: "Andi Lane subscribed to you",
    time: new Date(),
  },
];

export interface Product {
  amount: number;
  name: string;
  price: number;
  quantity: number;
}

export const topSellingProductsData: Product[] = [
  {
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    name: "Half Sleeve Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    name: "Lightweight Jacket",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    name: "Marco Shoes",
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
  },
];

interface TotalSales {
  amount: number;
  source: "Direct" | "Affilliate" | "Sponsored" | "Email";
}

export const totalSalesData: TotalSales[] = [
  {
    source: "Direct",
    amount: 300.56,
  },
  {
    source: "Affilliate",
    amount: 135.18,
  },
  {
    source: "Sponsored",
    amount: 154.02,
  },
  {
    source: "Email",
    amount: 48.96,
  },
];

export type Activity = {
  description: string;
  time: Date;
};

export const activitiesData: Activity[] = [
  {
    description: "You have a bug that needs to be fixed.",
    time: new Date(),
  },
  {
    description: "Released a new version",
    time: new Date(),
  },
  {
    description: "Submitted a bug",
    time: new Date(),
  },
  {
    description: "Modified A data in Page X",
    time: new Date(),
  },
  {
    description: "Deleted a page in Project X",
    time: new Date(),
  },
];
export const ordersTableData = [
  {
    Id: "#CM9809",
    User: "Natali Craig",
    Project: "Landing Page",
    Address: "Meadow Lane Oakland",
    Date: "Just now",
    Status: "In Progress",
  },
  {
    Id: "#CM9802",
    User: "Kate Morrison",
    Project: "CRM Admin pages",
    Address: "Larry San Francisco",
    Date: "A minute ago",
    Status: "Complete",
  },
  {
    Id: "#CM9803",
    User: "Drew Cano",
    Project: "Client Project",
    Address: "Bagwell Avenue Ocala",
    Date: "1 hour ago",
    Status: "Pending",
  },
  {
    Id: "#CM9804",
    User: "Orlando Diggs",
    Project: "Admin Dashboard",
    Address: "Washburn Baton Rouge",
    Date: "Yesterday",
    Status: "Approved",
  },
  {
    Id: "#CM9892",
    User: "Natali Craig",
    Project: "Landing Page",
    Address: "Meadow Lane Oakland",
    Date: "Just now",
    Status: "In Progress",
  },
  {
    Id: "#CM9902",
    User: "Kate Morrison",
    Project: "CRM Admin pages",
    Address: "Larry San Francisco",
    Date: "A minute ago",
    Status: "Complete",
  },
  {
    Id: "#CM9805",
    User: "Andi Lane",
    Project: "App Landing Page",
    Address: "Nest Lane Olivette",
    Date: "Feb 2, 2023",
    Status: "Rejected",
  },
  {
    Id: "#CM9905",
    User: "Andi Lane",
    Project: "App Landing Page",
    Address: "Nest Lane Olivette",
    Date: "Feb 2, 2023",
    Status: "Rejected",
  },
  {
    Id: "#CM9904",
    User: "Orlando Diggs",
    Project: "Admin Dashboard",
    Address: "Washburn Baton Rouge",
    Date: "Yesterday",
    Status: "Approved",
  },
  {
    Id: "#CM9903",
    User: "Drew Cano",
    Project: "Client Project",
    Address: "Bagwell Avenue Ocala",
    Date: "1 hour ago",
    Status: "Pending",
  },
] as const;
