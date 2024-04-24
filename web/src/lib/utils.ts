import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNonCachingImgUrl(image: string | undefined | null) {
 return !!image ? `${image}?${new Date().getTime()}` : undefined;
}