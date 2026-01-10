import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";
import type { Article } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupdSourcesByLaw(sources: Article[]) {
  return Object.groupBy(sources, (s) => s.law_id);
}
