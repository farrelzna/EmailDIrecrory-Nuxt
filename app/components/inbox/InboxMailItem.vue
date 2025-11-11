<template>
  <div
    :class="[
      'group flex items-center gap-3 border-b px-4 py-3 transition-colors cursor-pointer',
      isSelected ? 'bg-accent' : 'hover:bg-accent/50',
      email.unread ? 'bg-background' : 'bg-muted/30'
    ]"
    @click="$emit('select', email.id)"
  >
    <!-- Checkbox -->
    <div @click.stop>
      <Checkbox
        :checked="isChecked"
        @update:checked="() => $emit('toggle-check', email.id)"
      />
    </div>

    <!-- Star Button -->
    <div @click.stop>
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        @click="$emit('toggle-star', email.id)"
      >
        <svg
          v-if="email.starred"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </Button>
    </div>

    <!-- Avatar -->
    <Avatar class="h-9 w-9">
      <AvatarFallback :class="getAvatarColor(email.sender)">
        {{ getInitials(email.sender) }}
      </AvatarFallback>
    </Avatar>

    <!-- Email Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <span
            :class="[
              'truncate text-sm',
              email.unread ? 'font-bold' : 'font-medium'
            ]"
          >
            {{ email.sender }}
          </span>
          <Badge v-if="email.unread" variant="default" class="h-2 w-2 rounded-full p-0" />
        </div>
        <span class="text-xs text-muted-foreground shrink-0">
          {{ email.time }}
        </span>
      </div>
      
      <div class="flex items-center gap-2 mt-0.5">
        <span
          :class="[
            'text-sm truncate',
            email.unread ? 'font-semibold' : 'text-muted-foreground'
          ]"
        >
          {{ email.subject }}
        </span>
      </div>
      
      <p class="text-sm text-muted-foreground truncate mt-0.5">
        {{ email.snippet }}
      </p>
    </div>

    <!-- Labels (if any) -->
    <div v-if="email.labels && email.labels.length > 0" class="flex gap-1">
      <Badge
        v-for="label in email.labels"
        :key="label"
        variant="outline"
        class="text-xs"
      >
        {{ label }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

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
  email: Email
  isSelected: boolean
  isChecked: boolean
}

defineProps<Props>()
defineEmits(['select', 'toggle-check', 'toggle-star'])

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
