<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RefreshCw, MoreVertical } from 'lucide-vue-next'

interface Props {
  allSelected?: boolean
  refreshing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  allSelected: false,
  refreshing: false
})

const emit = defineEmits([
  'toggle-select-all',
  'refresh',
  'mark-all-read',
  'mark-all-unread'
])

function handleSelectAll(checked: boolean) {
  emit('toggle-select-all', checked)
}

function handleRefresh() {
  emit('refresh')
}

function handleMarkAllRead() {
  emit('mark-all-read')
}

function handleMarkAllUnread() {
  emit('mark-all-unread')
}
</script>

<template>
  <div class="border-b px-4 py-2 flex items-center gap-3 bg-muted/30">
    <!-- Select All Checkbox -->
    <Checkbox
      :checked="allSelected"
      @update:checked="handleSelectAll"
      class="cursor-pointer"
      title="Select all"
    />

    <!-- Refresh Button -->
    <button
      class="p-2 hover:bg-accent rounded-md transition-colors"
      title="Refresh"
      @click="handleRefresh"
      :disabled="refreshing"
    >
      <RefreshCw :size="16" :class="{ 'animate-spin': refreshing }" />
    </button>
    
    <!-- More Options Dropdown -->
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
</template>
