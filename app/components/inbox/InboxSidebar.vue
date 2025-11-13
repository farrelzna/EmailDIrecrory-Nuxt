<template>
  <div class="flex h-full flex-col gap-4 p-4 rounded-lg border bg-card overflow-hidden">
    <!-- Compose Button -->
    <Button class="w-full justify-start gap-2" size="lg">
      <Pencil :size="20" />
      Compose
    </Button>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto space-y-4">
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
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-vue-next'
import { FOLDERS, LABELS } from '@/constants'
import type { FolderType } from '@/types'

interface Props {
  activeFolder: FolderType
}

const props = defineProps<Props>()
defineEmits(['change-folder'])

const folders = FOLDERS
const labels = LABELS
</script>
