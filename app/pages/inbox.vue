<template>
  <div class="h-screen flex flex-col bg-background">
    <!-- Main Content -->
    <div class="flex-1 overflow-hidden">
      <div class="container h-full py-6">
        <div :class="['grid h-full min-h-0 gap-6', showDetail ? 'lg:grid-cols-[1fr_400px]' : 'lg:grid-cols-1']">
          <!-- Mail List -->
          <section class="flex flex-col min-w-0 min-h-0">
            <InboxMailList
              :emails="emailStore.displayEmails.value"
              :selected-id="emailStore.selectedEmail.value?.id"
              :selected-ids="emailStore.selectedIds.value"
              :refreshing="emailStore.isRefreshing.value"
              @select="emailStore.selectEmail"
              @toggle-check="emailStore.toggleCheck"
              @toggle-star="emailStore.toggleStar"
              @toggle-read="emailStore.toggleRead"
              @toggle-select-all="emailStore.toggleSelectAll"
              @archive="emailStore.archiveEmail"
              @archive-selected="emailStore.archiveSelected"
              @delete="emailStore.deleteEmail"
              @delete-selected="emailStore.deleteSelected"
              @snooze="emailStore.snoozeEmail"
              @mark-read-selected="emailStore.markReadSelected"
              @tab-change="emailStore.changeTab"
              @refresh="emailStore.refresh"
            />
          </section>

          <!-- Mail View (Hidden on mobile, shown on large screens) -->
          <section v-if="showDetail" class="hidden lg:block min-h-0">
            <InboxMailView
              :email="emailStore.selectedEmailDisplay.value"
              @toggle-star="emailStore.toggleStar"
              @archive="emailStore.archiveEmail"
              @delete="emailStore.deleteEmail"
              @close="closeDetail"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InboxMailList from '@/components/inbox/InboxMailList.vue'
import InboxMailView from '@/components/inbox/InboxMailView.vue'
import { useEmailStore } from '@/composables/useEmailStore'
import { migrateSearchDefaults } from '@/composables/useInboxSearch'

// Initialize email store
const emailStore = useEmailStore()

// Local state
const showDetail = ref(false)

// Migrate search defaults on page load
migrateSearchDefaults()

// Methods
function closeDetail() {
  showDetail.value = false
}

// Watch for email selection to show detail panel
watch(() => emailStore.selectedEmail.value, (newEmail) => {
  if (newEmail) {
    showDetail.value = true
  }
})
</script>
