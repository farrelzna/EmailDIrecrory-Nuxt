<script setup>    
import { ref, computed, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SlidersHorizontal, Search, X } from 'lucide-vue-next'
import { useInboxSearchState } from '@/composables/useInboxSearch'

const emit = defineEmits(['search'])
const searchQuery = ref('')
const filterOpen = ref(false)
// Global shared search state
const globalSearch = useInboxSearchState()

// Local editable filters (start with global values so reopening keeps previous settings)
const filters = ref({ ...globalSearch.value.filters })

const hasActiveFilters = computed(() => {
  const f = filters.value
  return [f.from, f.to, f.subject, f.includes].some(v => v.trim() !== '') ||
    !!f.customDate ||
    !!f.scope
})

function resetFilters() {
  filters.value = {
    from: '',
    to: '',
    subject: '',
    includes: '',
    customDate: '',
    scope: '',
  }
  const free = extractFreeText(searchQuery.value)
  searchQuery.value = free
}

function emitSearch() {
  const free = searchQuery.value.trim()
  const f = filters.value
  const tokens = []

  if (f.from.trim()) tokens.push(`from:${f.from.trim()}`)
  if (f.to.trim()) tokens.push(`to:(${f.to.trim()})`)
  if (f.subject.trim()) tokens.push(`subject:(${f.subject.trim()})`)
  if (f.includes.trim()) tokens.push(`includes:("${f.includes.trim()}")`)
  if (f.scope) tokens.push(`in:${f.scope}`)
  // Note: customDate not converted into token yet.

  // Compose normalized display string
  const composed = [free, ...tokens].filter(Boolean).join(' ').trim()
  searchQuery.value = composed

  emit('search', {
    query: composed,
    filters: { ...filters.value }
  })
  filterOpen.value = false
  // persist to global store for future reopen
  globalSearch.value.filters = { ...filters.value }
}

function emitState() {
  emit('search', {
    query: searchQuery.value.trim(),
    filters: { ...filters.value }
  })
  globalSearch.value.filters = { ...filters.value }
}

// Token parsing & sync: keep filters in sync when user edits the query box
function extractFreeText(text) {
  const pattern = /(from:[^\s]+|to:\([^)]*\)|subject:\([^)]*\)|includes:\("[^"]*"\)|has:attachment|-in:chats|in:(all|inbox|starred|sent|drafts|archive|trash))/gi
  return text.replace(pattern, '').replace(/\s+/g, ' ').trim()
}

function parseTokens(text) {
  const out = {
    from: '',
    to: '',
    subject: '',
    includes: '',
    scope: '',
  }
  const re = {
    from: /\bfrom:([^\s]+)/i,
    to: /\bto:\(([^)]*)\)/i,
    subject: /\bsubject:\(([^)]*)\)/i,
    includes: /\bincludes:\("([^"]*)"\)/i,
    scope: /\bin:(all|inbox|starred|sent|drafts|archive|trash)\b/i,
  }
  const mFrom = text.match(re.from); if (mFrom) out.from = mFrom[1] || ''
  const mTo = text.match(re.to); if (mTo) out.to = mTo[1] || ''
  const mSub = text.match(re.subject); if (mSub) out.subject = mSub[1] || ''
  const mInc = text.match(re.includes); if (mInc) out.includes = mInc[1] || ''
  const mScope = text.match(re.scope); if (mScope) out.scope = mScope[1]
  return out
}

function syncFromQuery() {
  const toks = parseTokens(searchQuery.value)
  // merge onto defaults to clear removed tokens
  filters.value = {
    ...filters.value,
    from: toks.from || '',
    to: toks.to || '',
    subject: toks.subject || '',
    includes: toks.includes || '',
    scope: toks.scope || '',
  }
}

// When typing, hanya sinkronkan token ke UI, jangan kirim event filter
watch(searchQuery, () => {
  syncFromQuery()
})

// Saat mengubah field filter di popover, JANGAN emit dulu; hanya apply saat klik Browse
watch(filters, () => {
  // no-op (keep local only until emitSearch)
}, { deep: true })

function clearSearch() {
  resetFilters()
  searchQuery.value = ''
  emitState()
}

// When popover opens, refresh local filters from global so values persist
watch(filterOpen, open => {
  if (open) {
    filters.value = { ...globalSearch.value.filters }
  }
})

// Also if global filters change elsewhere (e.g., header search), reflect them
watch(() => globalSearch.value.filters, newVal => {
  // only update if popover closed (to avoid overwriting user edits mid-typing)
  if (!filterOpen.value) {
    filters.value = { ...filters.value, ...newVal }
  }
}, { deep: true })
</script>

<template>
    <!-- Search Bar (when no items selected) -->
    <div class="relative w-full">
      <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <!-- Search-->
      <div class="relative">
        <Input
          v-model="searchQuery"
          placeholder="Search email"
          class="pl-9 pr-16 h-11 md:h-12 text-base"
          @input="syncFromQuery"
          @keyup.enter="emitSearch"
        />

        <Button
          v-if="searchQuery || hasActiveFilters"
          type="button"
          variant="ghost"
          size="icon"
          class="absolute right-10 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          title="Clear search"
          @click="clearSearch"
        >
          <X :size="16" />
        </Button>

        <!-- Filter -->
        <Popover v-model:open="filterOpen">
          <PopoverTrigger as-child>
            <!-- Funnel/Filter Icon Button -->
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
              :class="{ 'text-primary': hasActiveFilters }"
              title="Filter lanjutan"
            >
              <SlidersHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[600px] p-4 m-2 min-h-0 flex flex-col gap-4 max-h-[70vh] translate-x-3" align="end">
            <div class="grid gap-3 flex-1 overflow-y-auto pr-1">
              <div class="grid grid-cols-1 gap-2">
                <label class="text-xs font-medium">From</label>
                <Input v-model="filters.from" />
              </div>
              <div class="grid grid-cols-1 gap-2">
                <label class="text-xs font-medium">To</label>
                <Input v-model="filters.to" />
              </div>
              <div class="grid grid-cols-1 gap-2">
                <label class="text-xs font-medium">Subject</label>
                <Input v-model="filters.subject" />
              </div>
              <div class="grid grid-cols-1 gap-2">
                <label class="text-xs font-medium">Contains words</label>
                <Input v-model="filters.includes" />
              </div>
              <div class="grid grid-cols-2 gap-2 items-end">
                <div class="col-span-1">
                  <label class="text-xs font-medium">Date Coverage</label>
                  <select v-model="filters.dateRange" class="mt-1 block w-full rounded-md border bg-background px-2 py-1 text-sm">
                    <option value="all">All time</option>
                    <option value="1d">1 day</option>
                    <option value="7d">7 days</option>
                    <option value="1m">1 month</option>
                    <option value="6m">6 months</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div v-if="filters.dateRange === 'custom'">
                  <Input v-model="filters.customDate" type="date" />
                </div>
                <div class="col-span-1">
                  <label class="text-xs font-medium">Browse</label>
                  <select v-model="filters.scope" class="mt-1 block w-full rounded-md border bg-background px-2 py-1 text-sm">
                    <option value="all">All Emails</option>
                    <option value="inbox">Inbox</option>
                    <option value="starred">Starred</option>
                    <option value="sent">Sent</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- Footer actions -->
            <div class="flex items-center justify-end gap-2 pt-2 border-t bg-background sticky bottom-0">
              <Button variant="secondary" size="sm" class="cursor-pointer" @click="resetFilters">Reset</Button>
              <Button variant="default" size="sm" class="cursor-pointer" @click="emitSearch">Browse</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
</template>
