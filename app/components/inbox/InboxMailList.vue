<template>
  <div class="flex h-full flex-col rounded-lg border bg-card">
    <!-- Header -->
    <InboxHeader
      :selected-count="selectedIds.size"
      :all-selected="allSelected"
      :refreshing="refreshing"
      @toggle-select-all="$emit('toggle-select-all', $event)"
      @archive-selected="$emit('archive-selected')"
      @delete-selected="$emit('delete-selected')"
      @mark-read-selected="$emit('mark-read-selected')"
      @search="$emit('search', $event)"
      @tabs-change="$emit('tabs-change', $event)"
      @refresh="$emit('refresh')"
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
import { computed } from 'vue'
import InboxHeader from './InboxHeader.vue'
import InboxMailItem from './InboxMailItem.vue'

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
defineEmits(['select', 'toggle-check', 'toggle-star', 'toggle-select-all', 'archive-selected', 'delete-selected', 'mark-read-selected', 'search', 'refresh', 'tabs-change'])

const allSelected = computed(() => {
  return props.emails.length > 0 && props.emails.every(email => props.selectedIds.has(email.id))
})
</script>
