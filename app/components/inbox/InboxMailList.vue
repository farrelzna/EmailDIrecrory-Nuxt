<template>
  <div class="flex h-full flex-col rounded-lg border bg-card">
    <!-- Toolbar: Checkbox All + Refresh + More -->
    <div class="border-b px-4 py-2 flex items-center gap-3">
      <Checkbox
        :checked="allSelected"
        @update:checked="handleSelectAll"
        class="cursor-pointer"
        title="Select all"
      />
      <button
        class="p-2 hover:bg-accent rounded-md transition-colors"
        title="Refresh"
        @click="$emit('refresh')"
        :disabled="refreshing"
      >
        <RefreshCw :size="16" :class="{ 'animate-spin': refreshing }" />
      </button>
      
      <!-- More Dropdown -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            class="p-2 hover:bg-accent rounded-md transition-colors"
            title="More options"
          >
            <MoreVertical :size="16" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem @click="handleMarkAllRead">
            <span>Mark all as read</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="handleMarkAllUnread">
            <span>Mark all as unread</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleSelectAll(true)">
            <span>Select all</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="handleSelectAll(false)">
            <span>Deselect all</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Tabs -->
    <div class="border-b">
      <div class="flex items-center px-4">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="[
            'px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
            activeTab === tab.value
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
          ]"
          @click="handleTabChange(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Bulk Actions Bar (when items selected) -->
    <InboxHeader
      v-if="selectedIds.size > 0"
      :selected-count="selectedIds.size"
      @archive-selected="$emit('archive-selected')"
      @delete-selected="$emit('delete-selected')"
      @mark-read-selected="$emit('mark-read-selected')"
    />

    <!-- Email List -->
    <div class="flex-1 overflow-y-auto">
      <InboxMailItem
        v-for="email in emails"
        :key="email.id"
        :email="email"
        :is-selected="email.id === selectedId"
        :is-checked="selectedIds.has(email.id)"
        @select="$emit('select', $event)"
        @toggle-check="$emit('toggle-check', $event)"
        @toggle-star="$emit('toggle-star', $event)"
        @archive="$emit('archive', $event)"
        @delete="$emit('delete', $event)"
        @toggle-read="$emit('toggle-read', $event)"
        @snooze="$emit('snooze', $event)"
      />

      <!-- Empty State -->
      <div v-if="emails.length === 0" class="flex flex-col items-center justify-center py-16">
        <Inbox class="text-muted-foreground mb-4" :size="64" />
        <h3 class="text-lg font-semibold">No messages</h3>
        <p class="text-sm text-muted-foreground mt-1">
          Your inbox is empty
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InboxHeader from './InboxHeader.vue'
import InboxMailItem from './InboxMailItem.vue'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Inbox, RefreshCw, MoreVertical } from 'lucide-vue-next'

// Tabs definition
const tabs = [
  { label: 'Primary', value: 'primary' },
  { label: 'Promotions', value: 'promotions' },
  { label: 'Social', value: 'social' },
  { label: 'Updates', value: 'updates' },
  { label: 'Forums', value: 'forums' }
]

const activeTab = ref('primary')

interface Email {
  id: string
  sender: string
  email: string
  subject: string
  snippet: string
  time: string
  unread: boolean
  starred: boolean
  labels?: string[]
}

interface Props {
  emails: Email[]
  selectedId?: string | null
  selectedIds: Set<string>
  refreshing?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits([
  'select',
  'toggle-check',
  'toggle-star',
  'toggle-select-all',
  'archive-selected',
  'delete-selected',
  'mark-read-selected',
  'refresh',
  'tab-change',
  'mark-all-read',
  'mark-all-unread',
  'archive',
  'delete',
  'toggle-read',
  'snooze'
])

const allSelected = computed(() => {
  if (props.emails.length === 0) return false
  // Force reactivity by converting Set to array
  const selectedArray = Array.from(props.selectedIds)
  return props.emails.every(email => selectedArray.includes(email.id))
})

// Indeterminate state: some but not all selected
const someSelected = computed(() => {
  const selectedCount = props.selectedIds.size
  return selectedCount > 0 && selectedCount < props.emails.length
})

// Select all handler
function handleSelectAll(checked: boolean) {
  console.log('InboxMailList: handleSelectAll called with:', checked)
  console.log('Current selectedIds size:', props.selectedIds.size)
  emit('toggle-select-all', checked)
}

// Mark all as read handler
function handleMarkAllRead() {
  emit('mark-all-read')
}

// Mark all as unread handler
function handleMarkAllUnread() {
  emit('mark-all-unread')
}

// Tab change handler
function handleTabChange(value: string) {
  activeTab.value = value
  emit('tab-change', value)
}

</script>
