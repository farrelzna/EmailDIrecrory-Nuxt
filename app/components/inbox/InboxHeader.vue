<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Archive, Trash2, MailOpen } from 'lucide-vue-next'

defineProps({
  selectedCount: { type: Number, required: true },
})

defineEmits(['archive-selected', 'delete-selected', 'mark-read-selected'])
</script>

<template>
  <div class="bg-primary/10 border-b px-4 py-3">
    <div class="flex items-center gap-2">
      <!-- Selected Count -->
      <span class="text-sm font-semibold">
        {{ selectedCount }} email{{ selectedCount > 1 ? 's' : '' }} selected
      </span>
      
      <Separator orientation="vertical" class="h-6" />
      
      <!-- Bulk Actions -->
      <div class="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('archive-selected')"
          class="gap-2"
        >
          <Archive :size="16" />
          <span>Archive</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          @click="$emit('delete-selected')"
          class="gap-2"
        >
          <Trash2 :size="16" />
          <span>Delete</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          @click="$emit('mark-read-selected')"
          class="gap-2"
        >
          <MailOpen :size="16" />
          <span>Mark Read</span>
        </Button>
      </div>
    </div>
  </div>
</template>
