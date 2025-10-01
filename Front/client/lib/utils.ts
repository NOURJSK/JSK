import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorFromErrors = (name: string, errors: any) => {
  const nameSlices = name.split(".");
  return nameSlices.reduce((acc, v) => {
    return acc?.[v] || {};
  }, errors);
};
