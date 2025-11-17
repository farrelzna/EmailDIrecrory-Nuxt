import { ref, computed } from 'vue'
import type { Email, TabType, FolderType } from '@/types'
import { MOCK_EMAILS } from '@/constants/mockData'
import { formatDayMonth, stripSearchOperators } from '@/lib/utils'
import { useInboxSearchState } from './useInboxSearch'
import { useActiveFolder } from './useInboxState'

/**
 * Email Store Composable
 * Manages all email data, selection, filtering, and operations
 */
export function useEmailStore() {
  // State
  const emails = ref<Email[]>([...MOCK_EMAILS])
  const selectedEmail = ref<Email | null>(null)
  const selectedIds = ref<string[]>([])
  const isRefreshing = ref(false)
  const tabFilter = ref<TabType>('all')

  // Dependencies
  const activeFolder = useActiveFolder()
  const inboxSearch = useInboxSearchState()

  // Computed: Filtered Emails
  const filteredEmails = computed(() => {
    let base = emails.value
    
    // React to search refresh
    void inboxSearch.value.lastRefresh
    
    const scope = inboxSearch.value.filters.scope
    
    // Apply folder/scope filtering
    if (!scope) {
      // Follow active folder
      if (activeFolder.value === 'starred') {
        base = base.filter(e => e.starred && e.folder !== 'trash')
      } else if (activeFolder.value === 'all') {
        base = base.filter(e => e.folder !== 'trash')
      } else {
        base = base.filter(e => e.folder === activeFolder.value)
      }
    } else if (scope === 'all') {
      base = base.filter(e => e.folder !== 'trash')
    } else if (scope === 'starred') {
      base = base.filter(e => e.starred && e.folder !== 'trash')
    } else {
      base = base.filter(e => e.folder === scope)
    }

    // Apply text search
    const q = stripSearchOperators(inboxSearch.value.query || '').toLowerCase()
    const f = inboxSearch.value.filters

    if (q) {
      base = base.filter(e =>
        [e.sender, e.email, e.subject, e.snippet].some(v => v?.toLowerCase().includes(q))
      )
    }

    // Apply advanced filters
    if (f.from.trim()) {
      const s = f.from.toLowerCase()
      base = base.filter(e => e.sender.toLowerCase().includes(s) || e.email.toLowerCase().includes(s))
    }
    
    if (f.subject.trim()) {
      const s = f.subject.toLowerCase()
      base = base.filter(e => e.subject.toLowerCase().includes(s))
    }
    
    if (f.includes.trim()) {
      const s = f.includes.toLowerCase()
      base = base.filter(e => `${e.sender} ${e.subject} ${e.snippet}`.toLowerCase().includes(s))
    }
    
    if (f.hasAttachment) {
      base = base.filter(e => (e.attachments?.length || 0) > 0)
    }

    // Date filtering
    if (f.customDate) {
      const start = new Date(f.customDate)
      const end = new Date(start)
      end.setDate(start.getDate() + 1)
      base = base.filter(e => {
        const d = new Date(e.datetime)
        return d >= start && d < end
      })
    }

    // Tab-based label filter
    if (tabFilter.value === 'important') {
      base = base.filter(e => (e.labels || []).some(l => l.toLowerCase() === 'important'))
    } else if (tabFilter.value === 'social') {
      base = base.filter(e => (e.labels || []).some(l => l.toLowerCase() === 'social'))
    }

    return base
  })

  // Computed: Display Emails (with formatted time)
  const displayEmails = computed(() =>
    filteredEmails.value.map(e => ({
      ...e,
      time: formatDayMonth(e.datetime)
    }))
  )

  // Computed: Selected Email (with formatted time)
  const selectedEmailDisplay = computed(() =>
    selectedEmail.value
      ? { ...selectedEmail.value, time: formatDayMonth(selectedEmail.value.datetime) }
      : null
  )

  // Methods: Selection
  function selectEmail(id: string) {
    const found = emails.value.find(e => e.id === id)
    if (found) {
      selectedEmail.value = found
      // Mark as read when selected
      if (found.unread) {
        found.unread = false
      }
    }
  }

  function toggleCheck(id: string) {
    const index = selectedIds.value.indexOf(id)
    if (index > -1) {
      selectedIds.value.splice(index, 1)
    } else {
      selectedIds.value.push(id)
    }
  }

  function toggleSelectAll(checked: boolean) {
    if (checked) {
      selectedIds.value = displayEmails.value.map(email => email.id)
    } else {
      selectedIds.value = []
    }
  }

  // Methods: Email Actions
  function toggleStar(id: string) {
    const email = emails.value.find(e => e.id === id)
    if (email) {
      email.starred = !email.starred
    }
  }

  function toggleRead(id: string) {
    const email = emails.value.find(e => e.id === id)
    if (email) {
      email.unread = !email.unread
    }
  }

  function deleteEmail(id: string) {
    const email = emails.value.find(e => e.id === id)
    if (email) {
      email.folder = 'trash'
      
      // Select next email if current is deleted
      if (selectedEmail.value?.id === id) {
        const currentIndex = filteredEmails.value.findIndex(e => e.id === id)
        const nextEmail = filteredEmails.value[currentIndex + 1] || 
                         filteredEmails.value[currentIndex - 1] || 
                         null
        selectedEmail.value = nextEmail
      }
    }
  }

  function archiveEmail(id: string) {
    const email = emails.value.find(e => e.id === id)
    if (email) {
      email.folder = 'archive'
      
      // Select next email if current is archived
      if (selectedEmail.value?.id === id) {
        const currentIndex = filteredEmails.value.findIndex(e => e.id === id)
        const nextEmail = filteredEmails.value[currentIndex + 1] || 
                         filteredEmails.value[currentIndex - 1] || 
                         null
        selectedEmail.value = nextEmail
      }
    }
  }

  function snoozeEmail(id: string) {
    const email = emails.value.find(e => e.id === id)
    if (email) {
      // TODO: Implement snooze functionality
      // For now, just mark as unread and show console log
      email.unread = true
      console.log('Email snoozed:', email.subject)
      // In future: Add snooze date/time, move to snoozed folder, etc.
    }
  }

  // Methods: Bulk Actions
  function deleteSelected() {
    selectedIds.value.forEach(id => deleteEmail(id))
    selectedIds.value = []
  }

  function archiveSelected() {
    selectedIds.value.forEach(id => archiveEmail(id))
    selectedIds.value = []
  }

  function markReadSelected() {
    selectedIds.value.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.unread = false
      }
    })
    selectedIds.value = []
  }

  function markAllRead() {
    displayEmails.value.forEach(email => {
      const e = emails.value.find(em => em.id === email.id)
      if (e) e.unread = false
    })
  }

  function markAllUnread() {
    displayEmails.value.forEach(email => {
      const e = emails.value.find(em => em.id === email.id)
      if (e) e.unread = true
    })
  }

  // Methods: Other
  function changeTab(tab: TabType) {
    tabFilter.value = tab
  }

  function refresh() {
    isRefreshing.value = true
    
    // Reset selection to first email
    nextTick(() => {
      selectedIds.value = []
      selectedEmail.value = null
    })
    
    setTimeout(() => {
      isRefreshing.value = false
    }, 400)
  }

  return {
    // State
    emails,
    selectedEmail,
    selectedIds,
    isRefreshing,
    tabFilter,
    
    // Computed
    filteredEmails,
    displayEmails,
    selectedEmailDisplay,
    
    // Methods
    selectEmail,
    toggleCheck,
    toggleSelectAll,
    toggleStar,
    toggleRead,
    deleteEmail,
    archiveEmail,
    snoozeEmail,
    deleteSelected,
    archiveSelected,
    markReadSelected,
    markAllRead,
    markAllUnread,
    changeTab,
    refresh,
  }
}
