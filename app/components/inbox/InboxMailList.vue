<template>
  <div class="flex h-full flex-col rounded-lg border bg-card">
    <!-- Toolbar: Checkbox All + Refresh + Bulk Actions + More -->
    <div class="border-b px-4 py-2 flex items-center gap-2">
      <div class="flex items-center">
        <input 
          type="checkbox"
          :checked="allSelected"
          :indeterminate.prop="someSelected && !allSelected"
          @change="handleCheckboxChange"
          class="peer h-4 w-4 shrink-0 rounded-sm border border-input shadow-sm transition-colors
                 accent-black
                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400
                 disabled:cursor-not-allowed disabled:opacity-50
                 cursor-pointer"
          title="Select all"
        />
      </div>
      <button
        class="p-2 hover:bg-accent rounded-md transition-colors"
        title="Refresh"
        @click="$emit('refresh')"
        :disabled="refreshing"
      >
        <RefreshCw :size="16" :class="{ 'animate-spin': refreshing }" />
      </button>
      
      <!-- Bulk Actions (shown when items selected) -->
      <template v-if="selectedIds.length > 0">
        <Separator orientation="vertical" class="h-6" />
        
        <button
          class="p-2 hover:bg-accent rounded-md transition-colors"
          title="Archive selected"
          @click="$emit('archive-selected')"
        >
          <Archive :size="16" />
        </button>
        
        <button
          class="p-2 hover:bg-accent rounded-md transition-colors"
          title="Delete selected"
          @click="$emit('delete-selected')"
        >
          <Trash2 :size="16" />
        </button>
        
        <button
          class="p-2 hover:bg-accent rounded-md transition-colors"
          title="Mark as read"
          @click="$emit('mark-read-selected')"
        >
          <MailOpen :size="16" />
        </button>
      </template>
      
      <div class="flex-1"></div>
      
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="handleMarkAllRead">
            <span>Mark all as read</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="handleMarkAllUnread">
            <span>Mark all as unread</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="() => emit('toggle-select-all', true)">
            <span>Select all</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="() => emit('toggle-select-all', false)">
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

    <!-- Email List -->
    <div class="flex-1 overflow-y-auto">
      <InboxMailItem
        v-for="email in emails"
        :key="email.id"
        :email="email"
        :is-selected="email.id === selectedId"
        :is-checked="selectedIds.includes(email.id)"
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
import InboxMailItem from './InboxMailItem.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Inbox, RefreshCw, MoreVertical, Archive, Trash2, MailOpen } from 'lucide-vue-next'
import { TABS } from '@/constants'
import type { EmailWithTime, TabType } from '@/types'

const activeTab = ref<TabType>('all')

interface Props {
  emails: EmailWithTime[]
  selectedId?: string | null
  selectedIds: string[]
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
  'archive',
  'delete',
  'toggle-read',
  'snooze'
])

const tabs = TABS

const allSelected = computed(() => {
  if (props.emails.length === 0) return false
  return props.emails.every(email => props.selectedIds.includes(email.id))
})

// Indeterminate state: some but not all selected
const someSelected = computed(() => {
  const selectedCount = props.selectedIds.length
  return selectedCount > 0 && selectedCount < props.emails.length
})

// Handle checkbox change
function handleCheckboxChange() {
  // When clicked, if currently all selected -> deselect all
  // Otherwise -> select all
  const shouldSelectAll = !allSelected.value
  emit('toggle-select-all', shouldSelectAll)
}

// Mark all as read handler (from dropdown menu)
function handleMarkAllRead() {
  // Mark all visible emails as read
  props.emails.forEach(email => {
    if (email.unread) {
      emit('toggle-read', email.id)
    }
  })
}

// Mark all as unread handler (from dropdown menu)
function handleMarkAllUnread() {
  // Mark all visible emails as unread
  props.emails.forEach(email => {
    if (!email.unread) {
      emit('toggle-read', email.id)
    }
  })
}

// Tab change handler
function handleTabChange(value: TabType) {
  activeTab.value = value
  emit('tab-change', value)
}

</script>
