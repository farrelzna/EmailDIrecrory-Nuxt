import { Inbox, Star, Send, FileText, Archive, Trash2 } from 'lucide-vue-next'
import type { Folder, Label, Tab } from '@/types'

// Folder Configuration
export const FOLDERS: Folder[] = [
  { id: 'inbox', name: 'Inbox', icon: Inbox, count: 0 },
  { id: 'starred', name: 'Starred', icon: Star, count: 0 },
  { id: 'sent', name: 'Sent', icon: Send, count: 0 },
  { id: 'drafts', name: 'Drafts', icon: FileText, count: 0 },
  { id: 'archive', name: 'Archive', icon: Archive, count: 0 },
  { id: 'trash', name: 'Trash', icon: Trash2, count: 0 },
]

// Label Configuration
export const LABELS: Label[] = [
  { id: 'work', name: 'Work', color: 'bg-blue-500' },
  { id: 'personal', name: 'Personal', color: 'bg-green-500' },
  { id: 'important', name: 'Important', color: 'bg-red-500' },
  { id: 'social', name: 'Social', color: 'bg-purple-500' },
  { id: 'newsletter', name: 'Newsletter', color: 'bg-orange-500' },
]

// Tab Configuration
export const TABS: Tab[] = [
  { value: 'all', label: 'All' },
  { value: 'important', label: 'Important' },
  { value: 'social', label: 'Social' },
]

// Default Search Filters
export const DEFAULT_FILTERS = {
  from: '',
  to: '',
  subject: '',
  includes: '',
  dateRange: 'all',
  customDate: '',
  scope: '' as const,
  hasAttachment: false,
  excludeChats: false,
}

// Avatar Color Mapping
export const AVATAR_COLORS = [
  'bg-red-500 text-white',
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-yellow-500 text-white',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
  'bg-indigo-500 text-white',
  'bg-orange-500 text-white',
]
