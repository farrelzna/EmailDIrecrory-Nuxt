<script setup>
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Archive, Trash2, MailOpen, RefreshCw } from 'lucide-vue-next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ref } from 'vue'

defineProps({
  selectedCount: { type: Number, required: true },
  allSelected: { type: Boolean, required: true },
  refreshing: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle-select-all', 'archive-selected', 'delete-selected', 'mark-read-selected', 'refresh', 'tabs-change'])

const tabValue = ref('all')
function onTabChange(val) {
  tabValue.value = val
  emit('tabs-change', val)
}
</script>

<template>
  <div class="border-b px-4 py-3">
    <div class="flex items-center gap-3 flex-1">
      <!-- Select All Checkbox -->
      <Checkbox
        :checked="allSelected"
        @update:checked="checked => $emit('toggle-select-all', checked)"
      />

      <!-- Bulk Actions (when items selected) -->
      <div v-if="selectedCount > 0" class="flex flex-1 items-center gap-2">
        <span class="text-sm font-medium text-muted-foreground">
          {{ selectedCount }} selected
        </span>
        
        <Separator orientation="vertical" class="h-6" />
        
        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            @click="$emit('archive-selected')"
            title="Archive"
          >
            <Archive :size="18" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="$emit('delete-selected')"
            title="Delete"
          >
            <Trash2 :size="18" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="$emit('mark-read-selected')"
            title="Mark as read"
          >
            <MailOpen :size="18" />
          </Button>
        </div>
      </div>

      <!-- Refresh Button -->
      <Button variant="ghost" size="icon" title="Refresh" @click="$emit('refresh')">
        <RefreshCw :size="18" :class="[{ 'animate-spin': refreshing }]" />
      </Button>
    </div>

    <Tabs class="mt-3" v-model="tabValue" @update:modelValue="onTabChange">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="important">Important</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>
      <TabsContent value="all" />
      <TabsContent value="important" />
      <TabsContent value="social" />
    </Tabs>
  </div>
</template>
