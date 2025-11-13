#  Email Directory - Architecture Documentation

##  Arsitektur Aplikasi

### Overview
Email Directory adalah aplikasi email client yang dibangun dengan **Nuxt 3**, **TypeScript**, **Vue 3**, dan **TailwindCSS**. Aplikasi ini menggunakan **Composition API** dan **composables** untuk state management yang efisien.

---

##  Struktur Folder

\\\
app/
 types/              # TypeScript interfaces & types
 constants/          # Configuration & mock data
 composables/        # Reactive state management
 lib/                # Utility functions
 components/         # Vue components
    inbox/         # Inbox-specific components
    layout/        # Layout components
    ui/            # Shadcn UI components
 pages/              # Nuxt pages (routes)
 layouts/            # Nuxt layouts
 plugins/            # Nuxt plugins
\\\

---

##  Key Concepts

### 1. **Types (pp/types/)**
Central type definitions untuk entire aplikasi.

**File: 	ypes/index.ts**
- \Email\ - Email object structure
- \User\ - User profile
- \FolderType\ - Email folder types
- \SearchFilters\ - Search filter object
- Dan lain-lain...

### 2. **Constants (pp/constants/)**

**File: constants/index.ts**
- \FOLDERS\ - Sidebar folder configuration
- \LABELS\ - Email labels/tags
- \TABS\ - Email tab filters
- \DEFAULT_FILTERS\ - Default search filters
- \AVATAR_COLORS\ - Avatar color palette

**File: constants/mockData.ts**
- \MOCK_EMAILS\ - Dummy email data
- \MOCK_USER\ - Current user mock

### 3. **Composables (pp/composables/)**

#### **useEmailStore.ts** 
Central email state management.

\\\	ypescript
const emailStore = useEmailStore()

// State
emailStore.emails              // All emails
emailStore.selectedEmail       // Currently selected email
emailStore.selectedIds         // Checked email IDs
emailStore.isRefreshing        // Loading state

// Computed
emailStore.filteredEmails      // Filtered by folder & search
emailStore.displayEmails       // With formatted time

// Methods
emailStore.selectEmail(id)
emailStore.toggleStar(id)
emailStore.deleteEmail(id)
emailStore.archiveEmail(id)
emailStore.refresh()
\\\

#### **useInboxState.ts**
Global active folder state.

\\\	ypescript
const activeFolder = useActiveFolder()  // 'inbox' | 'starred' | etc.
setActiveFolder('inbox')
\\\

#### **useInboxSearch.ts**
Global search state & filters.

\\\	ypescript
const searchState = useInboxSearchState()

// State
searchState.query
searchState.filters
searchState.lastRefresh

// Methods
setSearch({ query, filters })
resetSearch()
refreshSearch()
\\\

### 4. **Utils (pp/lib/utils.ts)**

Utility functions yang dapat digunakan di seluruh aplikasi.

\\\	ypescript
import { getInitials, getAvatarColor, formatDayMonth } from '@/lib/utils'

getInitials('John Doe')          //  'JD'
getAvatarColor('Alice')          //  'bg-blue-500 text-white'
formatDayMonth('2025-11-10...')  //  '10 nov'
\\\

**Available Utils:**
- \cn()\ - Merge Tailwind classes
- \ormatDayMonth()\ - Format date to "d MMM"
- \getInitials()\ - Extract initials from name
- \getAvatarColor()\ - Consistent color for avatar
- \stripSearchOperators()\ - Clean search tokens
- \extractFreeText()\ - Extract text without operators
- \ormatFileSize()\ - Human-readable file size
- \	runcate()\ - Truncate with ellipsis
- \debounce()\ - Debounce function

---

##  Data Flow

\\\
User Action (Component)
         
    useEmailStore
         
   Update State
         
  Computed (filtered)
         
   Component Re-renders
\\\

### Example: Delete Email

\\\	ypescript
// Component
<InboxMailView @delete="emailStore.deleteEmail" />

// useEmailStore.ts
function deleteEmail(id: string) {
  const email = emails.value.find(e => e.id === id)
  if (email) {
    email.folder = 'trash'  // Move to trash
    // Auto-select next email...
  }
}

// Computed automatically updates
const filteredEmails = computed(() => {
  return emails.value.filter(e => e.folder === activeFolder.value)
})
\\\

---

##  Component Structure

### Page Component (pages/inbox.vue)
- **Responsibility**: Minimal! Hanya initialize store & handle local UI state
- **No business logic**: Semua logic di \useEmailStore\
- **Clean**: 64 lines only!

### Feature Components (components/inbox/)
- \InboxMailList.vue\ - Email list with toolbar & tabs
- \InboxMailItem.vue\ - Single email item
- \InboxMailView.vue\ - Email detail view
- \InboxSidebar.vue\ - Folder navigation
- \InboxSearch.vue\ - Search with advanced filters

---

##  Search System

### Basic Search
User types  query string  filter emails by sender/subject/snippet

### Advanced Filters
- \rom:alice\ - Filter by sender
- \subject:(meeting)\ - Filter by subject
- \has:attachment\ - Only emails with attachments
- \in:starred\ - Search in specific folder

### Filter Priority
1. Scope/Folder (in: token or activeFolder)
2. Text query
3. Advanced filters (from, subject, includes)
4. Date range
5. Tab filters (important, social)

---

##  Styling

- **Framework**: TailwindCSS v4
- **UI Components**: Shadcn Vue (Radix Vue + TailwindCSS)
- **Icons**: Lucide Vue Next
- **Responsive**: Mobile-first approach

---

##  Getting Started

\\\ash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
\\\

---

##  Best Practices

### 1. **Type Everything**
\\\	ypescript
//  Good
const email: Email = {...}

//  Bad
const email = {...}
\\\

### 2. **Use Constants**
\\\	ypescript
//  Good
import { FOLDERS } from '@/constants'

//  Bad
const folders = [{ id: 'inbox', ... }]
\\\

### 3. **Composables for State**
\\\	ypescript
//  Good
const emailStore = useEmailStore()

//  Bad
const emails = ref([...])
const selectedEmail = ref(null)
// ... hundreds of lines
\\\

### 4. **Utils for Reusable Logic**
\\\	ypescript
//  Good
import { getInitials } from '@/lib/utils'

//  Bad
const initials = name.split(' ').map(n => n[0]).join('')
\\\

---

##  Type Safety Highlights

- **100% TypeScript** coverage
- **Strict mode** enabled
- **No \ny\ types** (kecuali Lucide icon components)
- **Proper interfaces** untuk props & emits
- **Type imports** untuk external types

---

##  Resources

- [Nuxt 3 Docs](https://nuxt.com)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn Vue](https://www.shadcn-vue.com)

---

*Last updated: November 13, 2025*
