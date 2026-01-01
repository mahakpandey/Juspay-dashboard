import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trim(str: string, length: number = 10) {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length).trim() + "...";
}
