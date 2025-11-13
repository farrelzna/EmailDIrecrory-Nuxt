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
    <div @click.stop class="flex items-center">
      <input 
        type="checkbox"
        :checked="isChecked"
        @change="$emit('toggle-check', email.id)"
        class="peer h-4 w-4 shrink-0 rounded-sm border border-input shadow-sm transition-colors
               accent-black
               focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400
               disabled:cursor-not-allowed disabled:opacity-50
               cursor-pointer"
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
        <Star
          v-if="email.starred"
          :size="16"
          class="text-yellow-500 fill-yellow-500"
        />
        <Star
          v-else
          :size="16"
          class="opacity-0 group-hover:opacity-100 transition-opacity"
        />
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

    <!-- Time and Labels (or Hover Actions) -->
    <div class="flex flex-col items-end gap-1 shrink-0 min-w-[120px]">
      <!-- Time (hidden on hover) -->
      <span class="text-xs text-muted-foreground group-hover:hidden">
        {{ email.time }}
      </span>
      
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
      
      <!-- Hover Actions (shown on hover, replaces time) -->
      <div class="hidden group-hover:flex items-center gap-1" @click.stop>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          title="Archive"
          @click="$emit('archive', email.id)"
        >
          <Archive :size="16" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          title="Delete"
          @click="$emit('delete', email.id)"
        >
          <Trash2 :size="16" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          :title="email.unread ? 'Mark as read' : 'Mark as unread'"
          @click="$emit('toggle-read', email.id)"
        >
          <Mail v-if="email.unread" :size="16" />
          <MailOpen v-else :size="16" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          title="Snooze"
          @click="$emit('snooze', email.id)"
        >
          <Clock :size="16" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star, Archive, Trash2, Mail, MailOpen, Clock } from 'lucide-vue-next'
import { getInitials, getAvatarColor } from '@/lib/utils'
import type { EmailWithTime } from '@/types'

interface Props {
  email: EmailWithTime
  isSelected: boolean
  isChecked: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['select', 'toggle-check', 'toggle-star', 'archive', 'delete', 'toggle-read', 'snooze'])
</script>
