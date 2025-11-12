import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format an ISO datetime string or Date to "d MMM" using Indonesian locale by default.
// Example: "2025-11-10T08:00:00Z" -> "10 nov"
export function formatDayMonth(
  input: string | Date,
  locale: string = 'id-ID',
  lowercaseMonth: boolean = true
): string {
  const d = typeof input === 'string' ? new Date(input) : input
  if (isNaN(d.getTime())) return ''

  // Use locale short month (e.g., Nov) and numeric day
  const formatted = d.toLocaleDateString(locale, { day: 'numeric', month: 'short' })

  // Normalize spacing and optionally lowercase month part
  // Indonesian short months typically have capitalization; we match the request (e.g., "10 nov")
  return lowercaseMonth ? formatted.replace(/\p{L}+/gu, m => m.toLowerCase()) : formatted
}
