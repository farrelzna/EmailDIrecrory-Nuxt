<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div v-if="email">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-xl font-semibold">{{ email.subject }}</h2>
          <div class="text-sm text-gray-500">From: {{ email.sender }} • {{ email.time }}</div>
        </div>
      </div>

      <article class="prose prose-sm mt-4 text-sm whitespace-pre-wrap text-gray-800">
        {{ email.body }}
      </article>
    </div>

    <div v-else class="text-gray-500 text-center py-12">
      Select an email to read
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  email: any | null
}>()
</script>

<style scoped>
</style>
