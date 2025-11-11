<template>
  <div class="flex h-full flex-col rounded-lg border bg-card">
    <div v-if="email" class="flex h-full flex-col">
      <!-- Header Actions -->
      <div class="flex items-center justify-between border-b px-4 py-3">
        <h3 class="text-sm font-semibold">Message</h3>
        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            @click="$emit('toggle-star', email.id)"
          >
            <svg
              v-if="email.starred"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#eab308"
              stroke="#eab308"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="$emit('archive', email.id)"
            title="Archive"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="5" x="2" y="3" rx="1"></rect>
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
              <path d="M10 12h4"></path>
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="$emit('delete', email.id)"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </Button>

          <Separator orientation="vertical" class="h-6 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            title="More"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </Button>
        </div>
      </div>

      <!-- Email Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Subject -->
        <h2 class="text-2xl font-bold mb-4">{{ email.subject }}</h2>

        <!-- Sender Info -->
        <div class="flex items-start gap-3 mb-6 pb-4 border-b">
          <Avatar class="h-10 w-10">
            <AvatarFallback :class="getAvatarColor(email.sender)">
              {{ getInitials(email.sender) }}
            </AvatarFallback>
          </Avatar>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">{{ email.sender }}</div>
                <div class="text-sm text-muted-foreground">{{ email.email }}</div>
              </div>
              <div class="text-sm text-muted-foreground">{{ email.time }}</div>
            </div>
          </div>
        </div>

        <!-- Email Body -->
        <div class="prose prose-sm max-w-none dark:prose-invert">
          <div class="whitespace-pre-wrap leading-relaxed">{{ email.body }}</div>
        </div>

        <!-- Attachments (if any) -->
        <div v-if="email.attachments && email.attachments.length > 0" class="mt-6 pt-6 border-t">
          <h3 class="text-sm font-semibold mb-3">Attachments</h3>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="attachment in email.attachments"
              :key="attachment"
              variant="outline"
              size="sm"
              class="gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              {{ attachment }}
            </Button>
          </div>
        </div>

        <!-- Reply Actions -->
        <div class="mt-8 pt-6 border-t space-y-3">
          <Button class="w-full gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 14 4 9 9 4"></polyline>
              <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
            </svg>
            Reply
          </Button>
          
          <div class="grid grid-cols-2 gap-2">
            <Button variant="outline" class="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="17 11 12 6 7 11"></polyline>
                <polyline points="17 18 12 13 7 18"></polyline>
              </svg>
              Reply All
            </Button>
            
            <Button variant="outline" class="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 14 20 9 15 4"></polyline>
                <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
              </svg>
              Forward
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex h-full items-center justify-center p-8">
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mx-auto mb-4 text-muted-foreground"
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
        <h3 class="text-lg font-semibold">No message selected</h3>
        <p class="text-sm text-muted-foreground mt-1">
          Select an email to read
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface Email {
  id: string
  sender: string
  email: string
  subject: string
  snippet: string
  time: string
  unread: boolean
  starred: boolean
  body: string
  attachments?: string[]
}

interface Props {
  email: Email | null
}

defineProps<Props>()
defineEmits(['toggle-star', 'archive', 'delete'])

function getInitials(name: string): string {
  const parts = name.split(' ')
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '')
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500 text-white',
    'bg-green-500 text-white',
    'bg-yellow-500 text-white',
    'bg-red-500 text-white',
    'bg-purple-500 text-white',
    'bg-pink-500 text-white',
    'bg-indigo-500 text-white',
    'bg-teal-500 text-white',
  ]
  
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  return colors[Math.abs(hash) % colors.length] || 'bg-gray-500 text-white'
}
</script>
