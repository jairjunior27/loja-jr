import { Prisma } from "@/generated/prisma";
import { Decimal } from "@/generated/prisma/runtime/library";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatDecimal = (preco: string | number | Prisma.Decimal) => {
  return parseFloat(preco.toString()).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
