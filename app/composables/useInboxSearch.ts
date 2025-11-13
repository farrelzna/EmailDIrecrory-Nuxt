import type { SearchState, SearchFilters, SearchPayload } from '@/types'
import { DEFAULT_FILTERS } from '@/constants'

/**
 * Global inbox search state composable
 * Manages search query and advanced filters
 */
export function useInboxSearchState() {
  return useState<SearchState>('inboxSearchState', () => ({
    query: '',
    filters: { ...DEFAULT_FILTERS },
    lastRefresh: 0,
  }))
}

/**
 * Update search query and filters
 */
export function setSearch(payload: SearchPayload) {
  const state = useInboxSearchState()
  state.value.query = payload.query
  state.value.filters = { 
    ...state.value.filters, 
    ...(payload.filters || {}) 
  }
}

/**
 * Trigger a refresh of search results
 */
export function refreshSearch() {
  const state = useInboxSearchState()
  state.value.lastRefresh = Date.now()
}

/**
 * Reset search to default state
 */
export function resetSearch() {
  const state = useInboxSearchState()
  state.value.query = ''
  state.value.filters = { ...DEFAULT_FILTERS }
}

/**
 * Migration helper: upgrade legacy search defaults
 * - Change dateRange from '1d' to 'all'
 * - Reset scope if it was 'all' by default and no explicit in: token
 */
export function migrateSearchDefaults() {
  const state = useInboxSearchState()
  
  // Upgrade legacy dateRange
  if (state.value.filters.dateRange === '1d') {
    state.value.filters.dateRange = 'all'
  }
  
  // Reset scope if no explicit in: token in query
  const hasScopeToken = /\bin:(all|inbox|starred|sent|drafts|archive|trash)\b/i.test(
    state.value.query || ''
  )
  
  if (!hasScopeToken && state.value.filters.scope === 'all') {
    state.value.filters.scope = ''
  }
}
