import { getLocalTimeZone } from "@internationalized/date";
import type { Updater } from "@tanstack/vue-table";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import type { DateValue } from "reka-ui";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRupiah = (price: number) => {
  const rupiah = price.toLocaleString("id-ID");
  return rupiah;
};

export const sumValue = <T>(
  array: T[],
  getValue: (item: T) => number
): number => {
  return array.reduce((sum, item) => sum + getValue(item), 0);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const isLocalImagePath = (value: string) => {
  return value.startsWith("images/");
};

export const formatToDDMMYYYY = (dateValue: DateValue | undefined) => {
  if (!dateValue) return "";

  const jsDate = dateValue.toDate(getLocalTimeZone());

  const day = String(jsDate.getDate()).padStart(2, "0");
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const year = jsDate.getFullYear();

  return `${year}-${month}-${day}`;
};

export const copyOrderID = (text: string) => {
  navigator.clipboard.writeText(text);
  push.success("Order ID copied to clipboard");
};