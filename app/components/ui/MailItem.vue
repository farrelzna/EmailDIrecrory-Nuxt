<template>
  <div
    @click="$emit('click')"
    :class="[
      'px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-start gap-3',
      isSelected ? 'bg-blue-50' : ''
    ]"
  >
  <div class="w-10 shrink-0">
      <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
        {{ initials }}
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <div class="truncate">
          <div class="flex items-center gap-2">
            <span :class="email.unread ? 'font-semibold' : 'font-medium'">{{ email.sender }}</span>
            <span class="text-gray-500 text-sm truncate">— {{ email.subject }}</span>
          </div>
        </div>
        <div class="text-xs text-gray-400 ml-2">{{ email.time }}</div>
      </div>

      <p class="text-sm text-gray-500 truncate mt-1">{{ email.snippet }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
  email: any
  isSelected?: boolean
}>()

const email = props.email
const isSelected = props.isSelected || false

const initials = computed(() => {
  const parts = (email.sender || '').split(' ')
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '')
})
</script>

<style scoped>
</style>
