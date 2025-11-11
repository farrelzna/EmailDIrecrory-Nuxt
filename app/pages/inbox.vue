<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <aside class="md:col-span-1">
          <Sidebar />
        </aside>

        <!-- Mail list -->
        <section class="md:col-span-2">
          <MailList
            :emails="emails"
            :selectedId="selectedEmail?.id"
            @select="selectEmail"
          />
        </section>

        <!-- Mail view -->
        <section class="md:col-span-1">
          <MailView :email="selectedEmail" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

// Mock data - replace with API or store later
const emails = ref([
  {
    id: '1',
    sender: 'Alice Johnson',
    subject: 'Welcome to EmailDirectory',
    snippet: 'Hi — welcome! Here are a few tips to get started...',
    time: '9:12 AM',
    unread: true,
    body: 'Hey there!\n\nThanks for joining EmailDirectory. We\'re excited to have you onboard.\n\n— The Team'
  },
  {
    id: '2',
    sender: 'GitHub',
    subject: 'New release: v1.2.0',
    snippet: 'We just shipped a new release with improvements...',
    time: 'Yesterday',
    unread: false,
    body: 'Release notes:\n- Feature A\n- Bugfix B\n\nUpgrade guide inside.'
  },
  {
    id: '3',
    sender: 'Bob Smith',
    subject: 'Meeting tomorrow',
    snippet: 'Can we move the meeting to 3pm?',
    time: 'Nov 9',
    unread: false,
    body: 'Hi,\n\nAre you available tomorrow at 3pm for the sync?\n\nThanks, Bob'
  }
])

const selectedEmail: Ref<typeof emails.value[0] | null> = ref(emails.value[0])

function selectEmail(id: string) {
  const found = emails.value.find(e => e.id === id) || null
  selectedEmail.value = found
}
</script>

<style scoped>
/* small visual tweaks */
</style>
