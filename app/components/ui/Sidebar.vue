<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="mb-4">
      <button class="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md">Compose</button>
    </div>

    <nav class="space-y-2">
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span class="font-medium">Folders</span>
      </div>
      <ul class="mt-2 space-y-1">
        <li class="flex items-center justify-between">
          <a href="#" class="text-gray-700 hover:text-black">Inbox</a>
          <span class="text-xs text-gray-500">3</span>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-black">Sent</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-black">Drafts</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-black">Archive</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
