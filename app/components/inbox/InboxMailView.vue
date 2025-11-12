<template>
  <div class="flex h-full flex-col rounded-lg border bg-card">
    <div v-if="email" class="flex h-full flex-col">
      <!-- Header Actions -->
      <div class="flex items-center justify-between border-b px-4 py-3 sticky top-0 z-10 bg-card">
        <h3 class="text-sm font-semibold">Message</h3>
        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            @click="$emit('toggle-star', email.id)"
          >
            <Star v-if="email.starred" :size="18" class="text-yellow-500 fill-yellow-500" />
            <Star v-else :size="18" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="$emit('archive', email.id)"
            title="Archive"
          >
            <Archive :size="18" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="$emit('delete', email.id)"
            title="Delete"
          >
            <Trash2 :size="18" />
          </Button>

          <Separator orientation="vertical" class="h-6 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            title="More"
          >
            <MoreVertical :size="18" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Close"
            @click="$emit('close')"
          >
            <X :size="18" />
          </Button>
        </div>
      </div>

      <!-- Email Content -->
  <div class="flex-1 overflow-y-auto p-6 min-h-0">
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
              <Paperclip :size="16" />
              {{ attachment }}
            </Button>
          </div>
        </div>

        <!-- Reply Actions -->
        <div class="mt-8 pt-6 border-t space-y-3">
          <Button class="w-full gap-2">
            <Reply :size="16" />
            Reply
          </Button>
          
          <div class="grid grid-cols-2 gap-2">
            <Button variant="outline" class="gap-2">
              <ReplyAll :size="16" />
              Reply All
            </Button>
            
            <Button variant="outline" class="gap-2">
              <Forward :size="16" />
              Forward
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex h-full items-center justify-center p-8">
      <div class="text-center">
        <Mails class="mx-auto mb-4 text-muted-foreground" :size="80" />
        <h3 class="text-lg font-semibold">No message selected</h3>
        <p class="text-sm text-muted-foreground mt-1">
          Select an email to read
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Star, Archive, Trash2, MoreVertical, Paperclip, Reply, ReplyAll, Forward, Mails, X } from 'lucide-vue-next'

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
defineEmits(['toggle-star', 'archive', 'delete', 'close'])

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
