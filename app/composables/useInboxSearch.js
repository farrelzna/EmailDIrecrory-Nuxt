const defaultFilters = {
  from: '',
  to: '',
  subject: '',
  includes: '',
  dateRange: 'all', // changed from '1d' so default shows everything
  customDate: '',
  // Empty scope means "follow active folder". Use explicit values to force scope.
  scope: '', // one of: '' | all | inbox | starred | sent | drafts | archive | trash
  hasAttachment: false,
  excludeChats: false,
}

export function useInboxSearchState() {
  const state = useState('inboxSearchState', () => ({
    query: '',
    filters: { ...defaultFilters },
    lastRefresh: 0,
  }))
  return state
}

export function setSearch(payload) {
  const state = useInboxSearchState()
  state.value.query = payload.query
  state.value.filters = { ...state.value.filters, ...(payload.filters || {}) }
}

export function refreshSearch() {
  const state = useInboxSearchState()
  state.value.lastRefresh = Date.now()
}

export function resetSearch() {
  const state = useInboxSearchState()
  state.value.query = ''
  state.value.filters = { ...defaultFilters }
}

// Migration helper: if an existing state in memory still has '1d', upgrade it to 'all'
export function migrateSearchDefaults() {
  const state = useInboxSearchState()
  if (state.value.filters.dateRange === '1d') {
    state.value.filters.dateRange = 'all'
  }
  // If scope is 'all' by legacy default and user didn't type an explicit in: token, follow active folder
  const hasScopeToken = /\bin:(all|inbox|starred|sent|drafts|archive|trash)\b/i.test(state.value.query || '')
  if (!hasScopeToken && state.value.filters.scope === 'all') {
    state.value.filters.scope = ''
  }
}
