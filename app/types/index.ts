// Core Email Types
export interface Email {
  id: string
  sender: string
  email: string
  subject: string
  snippet: string
  datetime: string
  unread: boolean
  starred: boolean
  folder: FolderType
  labels?: string[]
  body: string
  attachments?: string[]
  time?: string // Formatted time for display (e.g., "10 nov")
}

export interface EmailWithTime extends Email {
  time: string
}

// User Types
export interface User {
  name: string
  email: string
  photo?: string
}

// Folder & Label Types
export type FolderType = 'inbox' | 'starred' | 'sent' | 'drafts' | 'archive' | 'trash' | 'all'

export interface Folder {
  id: FolderType
  name: string
  icon: any // Lucide icon component
  count: number
}

export interface Label {
  id: string
  name: string
  color: string
}

// Tab Types
export type TabType = 'all' | 'important' | 'social'

export interface Tab {
  value: TabType
  label: string
}

// Search & Filter Types
export interface SearchFilters {
  from: string
  to: string
  subject: string
  includes: string
  dateRange: string
  customDate: string
  scope: '' | FolderType
  hasAttachment: boolean
  excludeChats: boolean
}

export interface SearchState {
  query: string
  filters: SearchFilters
  lastRefresh: number
}

export interface SearchPayload {
  query: string
  filters?: Partial<SearchFilters>
}

// Component Event Types
export interface EmailActionEvents {
  select: (id: string) => void
  'toggle-check': (id: string) => void
  'toggle-star': (id: string) => void
  'toggle-read': (id: string) => void
  archive: (id: string) => void
  delete: (id: string) => void
  snooze: (id: string) => void
}

export interface BulkActionEvents {
  'toggle-select-all': (checked: boolean) => void
  'archive-selected': () => void
  'delete-selected': () => void
  'mark-read-selected': () => void
  refresh: () => void
  'tab-change': (tab: TabType) => void
}
