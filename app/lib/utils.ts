import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AVATAR_COLORS } from '@/constants'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an ISO datetime string or Date to "d MMM" using Indonesian locale by default.
 * @example "2025-11-10T08:00:00Z" -> "10 nov"
 */
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

/**
 * Get initials from a name string
 * @example "John Doe" -> "JD"
 * @example "Alice" -> "A"
 */
export function getInitials(name: string): string {
  if (!name) return '??'
  
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '??'
  if (parts.length === 1) {
    return (parts[0] || '??').substring(0, 2).toUpperCase()
  }
  
  const first = parts[0]?.[0] || '?'
  const last = parts[parts.length - 1]?.[0] || '?'
  return (first + last).toUpperCase()
}

/**
 * Get consistent avatar color based on name
 * Uses a simple hash function to always return the same color for the same name
 */
export function getAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0] || 'bg-gray-500 text-white'
  
  // Simple hash function
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const index = Math.abs(hash) % AVATAR_COLORS.length
  return AVATAR_COLORS[index] || 'bg-gray-500 text-white'
}

/**
 * Strip search operators from query text
 * Removes tokens like from:, to:, subject:, includes:, has:, in:
 */
export function stripSearchOperators(text: string = ''): string {
  const pattern = /(from:[^\s]+|to:\([^)]*\)|subject:\([^)]*\)|includes:\("[^"]*"\)|has:attachment|-in:chats|in:(all|inbox|starred|sent|drafts|archive|trash))/gi
  return text.replace(pattern, '').replace(/\s+/g, ' ').trim()
}

/**
 * Extract free text from search query (without operators)
 */
export function extractFreeText(text: string): string {
  return stripSearchOperators(text)
}

/**
 * Format file size in human readable format
 * @example 1024 -> "1 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
