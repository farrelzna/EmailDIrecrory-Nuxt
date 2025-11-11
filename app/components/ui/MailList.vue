<template>
  <div class="bg-white rounded-lg shadow-sm">
    <div class="border-b px-4 py-3 flex items-center justify-between">
      <h3 class="text-lg font-medium">Primary</h3>
      <div class="text-sm text-gray-500">{{ emails.length }} messages</div>
    </div>

    <ul>
      <li v-for="email in emails" :key="email.id">
        <MailItem
          :email="email"
          :isSelected="email.id === selectedId"
          @click="() => $emit('select', email.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import MailItem from './MailItem.vue'

const props = defineProps<{
  emails: Array<any>
  selectedId?: string | null
}>()

const emit = defineEmits(['select'])
</script>

<style scoped>
</style>
