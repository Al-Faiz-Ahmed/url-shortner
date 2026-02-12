import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class name merger used across the app.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

