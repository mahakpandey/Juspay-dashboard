/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Activity,
  Contact,
  Notification,
  ordersTableData,
} from "@/lib/constants";

export type TField = {
  generatorFn?: () => any;
  key: string;
  possibleValues?: any[];
};

export function randomDataGenerator<T extends Record<string, any>>({
  fields,
  n = 20,
}: {
  fields: TField[];
  n?: number;
}): T[] {
  const result: T[] = [];

  const fallbackValues = [
    "Lorem ipsum",
    "Dolor sit amet",
    "Consectetur adipiscing",
    "Elit sed do",
    "Eiusmod tempor",
    "Incididunt ut labore",
    "Et dolore magna",
    "Aliqua ut enim",
    "Ad minim veniam",
    "Quis nostrud exercitation",
  ];

  for (let i = 0; i < n; i++) {
    const obj: Record<string, any> = {};

    for (const field of fields) {
      const { key, possibleValues, generatorFn } = field;

      if (generatorFn) {
        obj[key] = generatorFn();
      } else if (possibleValues?.length) {
        const randomIndex = Math.floor(Math.random() * possibleValues.length);
        obj[key] = possibleValues[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * fallbackValues.length);
        obj[key] = fallbackValues[randomIndex];
      }
    }

    result.push(obj as T);
  }

  return result;
}

export const randomDateTimeGenerator = (
  start: Date = new Date(Date.now() - 2 * 60 * 60 * 1000),
  end: Date = new Date(),
): Date => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
};

export const randomNumberGenerator = (
  min: number = 1,
  max: number = 100,
): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function getRandomNotifications() {
  const notifications = randomDataGenerator<Notification>({
    fields: [
      {
        key: "message",
        possibleValues: [
          "You have a bug that needs to be fixed.",
          "New user registered",
          "Andi Lane subscribed to you",
          "Payment failed for order #1234",
          "New comment on your post",
        ],
      },
      {
        key: "type",
        possibleValues: ["bug", "user", "subscription"],
      },
      {
        key: "time",
        generatorFn: () => randomDateTimeGenerator(),
      },
    ],
  });
  return notifications.sort((a, b) => b.time.getTime() - a.time.getTime());
}
export function getRandomActivities() {
  const activities = randomDataGenerator<Activity>({
    fields: [
      {
        key: "description",
        possibleValues: [
          "You have a bug that needs to be fixed",
          "Released a new version",
          "Submitted a bug",
          "Modified A data in Page X",
          "Deleted a page in Project X",
        ],
      },
      {
        key: "time",
        generatorFn: () => randomDateTimeGenerator(),
      },
    ],
  });

  return activities.sort((a, b) => b.time.getTime() - a.time.getTime());
}

export function getRandomContacts() {
  const contacts = randomDataGenerator<Contact>({
    fields: [
      {
        key: "firstName",
        possibleValues: ["Natali", "Drew", "Orlando", "Kate", "Andi", "Koray"],
      },
      {
        key: "lastName",
        possibleValues: [
          "Craig",
          "Cano",
          "Diggs",
          "Lane",
          "Morrison",
          "Okumus",
        ],
      },
    ],
  });

  return contacts;
}

export function getRandomOrders() {
  const orders = randomDataGenerator<(typeof ordersTableData)[number]>({
    fields: [
      {
        key: "Id",
        generatorFn: () => `#CM${randomNumberGenerator(9000, 9999)}`,
      },
      {
        key: "User",
        possibleValues: [
          "Natali Craig",
          "Kate Morrison",
          "Drew Cano",
          "Orlando Diggs",
          "Andi Lane",
        ],
      },
      {
        key: "Project",
        possibleValues: [
          "Landing Page",
          "CRM Admin pages",
          "Client Project",
          "Admin Dashboard",
          "App Landing Page",
        ],
      },
      {
        key: "Address",
        possibleValues: [
          "Meadow Lane Oakland",
          "Larry San Francisco",
          "Bagwell Avenue Ocala",
          "Washburn Baton Rouge",
          "Nest Lane Olivette",
        ],
      },
      {
        key: "Date",
        possibleValues: [
          "Just now",
          "A minute ago",
          "1 hour ago",
          "Yesterday",
          "Feb 2, 2023",
        ],
      },
      {
        key: "Status",
        possibleValues: [
          "In Progress",
          "Complete",
          "Pending",
          "Approved",
          "Rejected",
        ],
      },
    ],
  });

  return orders;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const stackedBarChartFields: TField[] = [
  {
    key: "name",
    possibleValues: months.slice(0, 6), // limit to first 6 months
  },
  {
    key: "uv",
    generatorFn: () => randomNumberGenerator(1500, 5000),
  },
  {
    key: "pv",
    generatorFn: () => randomNumberGenerator(1000, 10000),
  },
  {
    key: "amt",
    generatorFn: () => randomNumberGenerator(1500, 3000),
  },
];

export const lineChartFields: TField[] = [
  {
    key: "name",
    possibleValues: months,
  },
  {
    key: "uv",
    generatorFn: () => randomNumberGenerator(1500, 5000),
  },
  {
    key: "pv",
    generatorFn: () => randomNumberGenerator(1000, 10000),
  },
  {
    key: "amt",
    generatorFn: () => randomNumberGenerator(1500, 3000),
  },
];

const productNames = [
  "ASOS Ridley High Waist",
  "Marco Lightweight Shirt",
  "Half Sleeve Shirt",
  "Lightweight Jacket",
  "Marco Shoes",
  "Slim Fit Jeans",
  "Classic Polo",
  "Denim Jacket",
  "Leather Belt",
  "Canvas Sneakers",
];

export const productFields: TField[] = [
  {
    key: "name",
    possibleValues: productNames.slice(0, 5), // pick top 5 random ones
  },
  {
    key: "price",
    generatorFn: () =>
      parseFloat((randomNumberGenerator(20, 150) + Math.random()).toFixed(2)),
  },
  {
    key: "quantity",
    generatorFn: () => randomNumberGenerator(20, 200),
  },
  {
    key: "amount",
    // amount = price * quantity, slightly varied
    generatorFn: () => {
      const price = randomNumberGenerator(20, 150) + Math.random();
      const quantity = randomNumberGenerator(20, 200);
      return parseFloat((price * quantity).toFixed(2));
    },
  },
];

export const sources = [
  "Direct",
  "Affiliate",
  "Sponsored",
  "Email",
  "Social",
  "Referral",
];

export const totalSalesFields: TField[] = [
  {
    key: "source",
    possibleValues: sources.slice(0, 4), // mimic your 4 sources
  },
  {
    key: "amount",
    generatorFn: () =>
      parseFloat((randomNumberGenerator(40, 350) + Math.random()).toFixed(2)),
  },
];
