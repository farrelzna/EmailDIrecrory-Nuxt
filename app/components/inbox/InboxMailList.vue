<template>
  <div class="flex h-full flex-col rounded-lg border bg-card">
    <!-- Header -->
    <InboxHeader
      :selected-count="selectedIds.size"
      :all-selected="allSelected"
      @toggle-select-all="$emit('toggle-select-all', $event)"
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
      />

      <!-- Empty State -->
      <div v-if="emails.length === 0" class="flex flex-col items-center justify-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-muted-foreground mb-4"
        >
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
        </svg>
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
}

const props = defineProps<Props>()
defineEmits(['select', 'toggle-check', 'toggle-star', 'toggle-select-all', 'archive-selected', 'delete-selected', 'mark-read-selected'])

const allSelected = computed(() => {
  return props.emails.length > 0 && props.emails.every(email => props.selectedIds.has(email.id))
})
</script>
