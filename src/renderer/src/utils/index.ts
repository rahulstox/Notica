import clsx, { ClassValue } from 'clsx'
// tailwind-merge: duplicate or conflicting tailwind classes ko smartly merge karta hai
import { twMerge } from 'tailwind-merge'
// User ke system locale ke hisaab se ek date formatter banaya gaya
const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short', // e.g., 16/07/25
  timeStyle: 'short', // e.g., 7:15 PM
  timeZone: 'UTC' // Timezone set kiya gaya hai globally as UTC
})
// Milliseconds se date format karne ka util function
export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

// cn() ek utility hai jo clsx + tailwind-merge combine karta hai
// Clean tailwind className generation ke liye
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
