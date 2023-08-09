import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showDate(row: Date) {
  const inputDate = new Date(row);
  const formattedDate = format(inputDate, "dd MMM yyyy", { locale: id });

  return formattedDate;
}