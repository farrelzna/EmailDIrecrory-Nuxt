<template>
  <div class="flex h-full flex-col gap-4 p-4">
    <!-- Compose Button -->
    <Button class="w-full justify-start gap-2" size="lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      Compose
    </Button>

    <!-- Folders -->
    <nav class="flex flex-col gap-1">
      <button
        v-for="folder in folders"
        :key="folder.id"
        @click="$emit('change-folder', folder.id)"
        :class="[
          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          activeFolder === folder.id
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent hover:text-accent-foreground'
        ]"
      >
        <div class="flex items-center gap-3">
          <component :is="folder.icon" class="h-5 w-5" />
          <span>{{ folder.name }}</span>
        </div>
        <Badge v-if="folder.count > 0" variant="secondary" class="ml-auto">
          {{ folder.count }}
        </Badge>
      </button>
    </nav>

    <!-- Separator -->
    <Separator class="my-2" />

    <!-- Labels -->
    <div class="flex flex-col gap-2">
      <div class="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Labels
      </div>
      <nav class="flex flex-col gap-1">
        <button
          v-for="label in labels"
          :key="label.id"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
        >
          <div :class="['h-3 w-3 rounded-full', label.color]"></div>
          <span>{{ label.name }}</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Icons
const InboxIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
    </svg>
  `
}

const StarIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `
}

const SendIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"></path>
      <path d="M22 2 11 13"></path>
    </svg>
  `
}

const FileIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `
}

const ArchiveIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="5" x="2" y="3" rx="1"></rect>
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
      <path d="M10 12h4"></path>
    </svg>
  `
}

const TrashIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    </svg>
  `
}

interface Props {
  activeFolder: string
}

const props = defineProps<Props>()
defineEmits(['change-folder'])

const folders = [
  { id: 'inbox', name: 'Inbox', icon: InboxIcon, count: 5 },
  { id: 'starred', name: 'Starred', icon: StarIcon, count: 2 },
  { id: 'sent', name: 'Sent', icon: SendIcon, count: 0 },
  { id: 'drafts', name: 'Drafts', icon: FileIcon, count: 0 },
  { id: 'archive', name: 'Archive', icon: ArchiveIcon, count: 0 },
  { id: 'trash', name: 'Trash', icon: TrashIcon, count: 0 },
]

const labels = [
  { id: 'work', name: 'Work', color: 'bg-blue-500' },
  { id: 'personal', name: 'Personal', color: 'bg-green-500' },
  { id: 'important', name: 'Important', color: 'bg-red-500' },
]
</script>
