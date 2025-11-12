<template>
  <div class="h-screen flex flex-col bg-background">
    <!-- Top Header Bar -->
    <header class="border-b bg-card px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-lg font-semibold">Gmail Clone</h1>
        
        <!-- Global Search -->
        <div class="relative w-[500px] hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            placeholder="Search in mail"
            class="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <!-- User Profile -->
      <div class="flex items-center gap-3">
        <!-- Settings Button -->
        <button class="p-2 hover:bg-accent rounded-full transition-colors" title="Settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>

        <!-- User Avatar -->
        <button class="flex items-center gap-2 hover:bg-accent px-2 py-1 rounded-lg transition-colors">
          <Avatar class="h-8 w-8">
            <AvatarFallback class="bg-primary text-primary-foreground text-sm font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <span class="text-sm font-medium hidden lg:block">John Doe</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 overflow-hidden p-6">
      <div class="h-full max-w-[1600px] mx-auto">
        <div class="grid h-full gap-6 lg:grid-cols-[280px_1fr_400px] md:grid-cols-[240px_1fr]">
          <!-- Sidebar -->
          <aside class="hidden md:flex flex-col overflow-hidden">
            <InboxSidebar
              :active-folder="activeFolder"
              @change-folder="changeFolder"
            />
          </aside>

          <!-- Mail List -->
          <section class="flex flex-col overflow-hidden min-w-0">
            <InboxMailList
              :emails="filteredEmails"
              :selected-id="selectedEmail?.id"
              :selected-ids="selectedIds"
              @select="selectEmail"
              @toggle-check="toggleCheck"
              @toggle-star="toggleStar"
              @toggle-select-all="toggleSelectAll"
              @archive-selected="archiveSelected"
              @delete-selected="deleteSelected"
              @mark-read-selected="markReadSelected"
            />
          </section>

          <!-- Mail View (Hidden on mobile, shown on large screens) -->
          <section class="hidden lg:flex flex-col overflow-hidden">
            <InboxMailView
              :email="selectedEmail"
              @toggle-star="toggleStar"
              @archive="archiveEmail"
              @delete="deleteEmail"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import InboxSidebar from '@/components/inbox/InboxSidebar.vue'
import InboxMailList from '@/components/inbox/InboxMailList.vue'
import InboxMailView from '@/components/inbox/InboxMailView.vue'

interface Email {
  id: string
  sender: string
  email: string
  subject: string
  snippet: string
  time: string
  unread: boolean
  starred: boolean
  folder: 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash'
  body: string
  labels?: string[]
  attachments?: string[]
}

// ==================== DUMMY DATA ====================
const emails: Ref<Email[]> = ref([
  {
    id: '1',
    sender: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    subject: 'Q4 Marketing Strategy Review',
    snippet: 'Hi team, I wanted to share the latest updates on our Q4 marketing strategy...',
    time: '10:30 AM',
    unread: true,
    starred: true,
    folder: 'inbox',
    labels: ['Work'],
    body: `Hi team,

I wanted to share the latest updates on our Q4 marketing strategy. We've made significant progress in several key areas:

1. Social Media Campaign
   - Increased engagement by 45%
   - New followers: 12,500
   - Best performing content: Video tutorials

2. Email Marketing
   - Open rate: 28% (up from 22%)
   - Click-through rate: 5.2%
   - New automation workflows implemented

3. Content Strategy
   - Published 24 blog posts
   - SEO improvements ranking for 15 new keywords
   - Guest posting opportunities identified

Next Steps:
- Review budget allocation for paid ads
- Plan holiday season campaigns
- Finalize influencer partnerships

Please review the attached deck and share your feedback by EOD Friday.

Best regards,
Alice Johnson
Marketing Director`,
    attachments: ['Q4-Marketing-Strategy.pdf', 'Budget-Overview.xlsx']
  },
  {
    id: '2',
    sender: 'GitHub',
    email: 'notifications@github.com',
    subject: '[farrelzna/EmailDirectory] New release: v2.0.0',
    snippet: 'A new release v2.0.0 is now available with major improvements and bug fixes...',
    time: 'Yesterday',
    unread: false,
    starred: false,
    folder: 'inbox',
    body: `🎉 Release v2.0.0

What's New:
✨ New Features
- Added dark mode support
- Implemented email search functionality
- New keyboard shortcuts (Ctrl+K for quick actions)
- Drag and drop email organization
- Auto-save drafts

🐛 Bug Fixes
- Fixed issue with email attachments not downloading
- Resolved mobile responsiveness issues
- Fixed timezone display problems
- Corrected unread count badge

🔧 Improvements
- 40% faster email loading
- Reduced bundle size by 25%
- Better accessibility (WCAG 2.1 AA compliant)
- Improved error handling

📚 Documentation
Full changelog: https://github.com/farrelzna/EmailDirectory/releases/v2.0.0

To upgrade: npm install @emaildirectory/core@latest

Happy coding!
— GitHub Team`
  },
  {
    id: '3',
    sender: 'Bob Smith',
    email: 'bob.smith@techcorp.com',
    subject: 'Re: Project Timeline Discussion',
    snippet: 'Thanks for the update! I reviewed the timeline and have a few suggestions...',
    time: 'Nov 9',
    unread: false,
    starred: true,
    folder: 'inbox',
    labels: ['Work', 'Important'],
    body: `Hi,

Thanks for the update! I reviewed the timeline and have a few suggestions:

1. Phase 1 (Foundation) - Looks good, no changes needed

2. Phase 2 (Development) 
   - Suggest extending by 1 week for thorough testing
   - Need to account for holiday break in December

3. Phase 3 (Launch)
   - Let's aim for January 15th instead of January 1st
   - This gives us buffer time and avoids holiday season

Also, can we schedule a quick sync meeting this Friday at 3 PM to discuss resource allocation? I want to make sure we have enough developers assigned to the critical path items.

Let me know if this works for you.

Cheers,
Bob Smith
Senior Project Manager`
  },
  {
    id: '4',
    sender: 'Marketing Team',
    email: 'marketing@company.com',
    subject: 'Weekly Newsletter - November 2025',
    snippet: 'This week\'s highlights: New product launch, customer success stories, and upcoming events...',
    time: 'Nov 8',
    unread: false,
    starred: false,
    folder: 'inbox',
    labels: ['Newsletter'],
    body: `📰 Weekly Newsletter - November 2025

Hello Team!

Here are this week's highlights:

🚀 Product Updates
- Launched new analytics dashboard
- Released mobile app v3.2
- Beta testing for AI-powered email categorization

📊 Company News
- Reached 1 million active users! 🎉
- Featured in TechCrunch and Wired
- New office opening in Singapore next month

👥 Team Spotlight
This week we celebrate Sarah from Customer Success who helped resolve 150+ tickets with a 98% satisfaction rating!

� Upcoming Events
- Nov 15: All-hands meeting (10 AM PST)
- Nov 20: Product demo webinar
- Nov 25: Team building event

💡 Learning Resources
- New course: Advanced Email Marketing Strategies
- Workshop: Data-driven Decision Making
- Book club: "The Lean Startup" discussion

Have a great week!
— Marketing Team`
  },
  {
    id: '5',
    sender: 'Sarah Williams',
    email: 'sarah.williams@design.studio',
    subject: 'UI Design Feedback - Inbox Redesign',
    snippet: 'Hey! I have completed the first iteration of the inbox redesign. Would love your thoughts...',
    time: 'Nov 7',
    unread: false,
    starred: false,
    folder: 'inbox',
    labels: ['Work'],
    body: `Hey!

I have completed the first iteration of the inbox redesign. Would love your thoughts on the direction we are heading.

Key Changes:
✓ Cleaner, more modern interface
✓ Better use of whitespace
✓ Improved color contrast for accessibility
✓ New iconography system
✓ Responsive design optimizations

Design Goals:
1. Reduce cognitive load
2. Improve scanning efficiency
3. Maintain brand consistency
4. Enhance mobile experience

Figma Link: [View Designs]

I have also included some interaction prototypes to show the micro-animations and transitions. Pay special attention to:
- Email selection states
- Star/unstar animation
- Bulk action feedback
- Loading states

Please review and share feedback by Wednesday. We are planning to start implementation next sprint.

Looking forward to your input!

Sarah Williams
Lead UI/UX Designer`,
    attachments: ['Inbox-Redesign-v1.fig', 'Design-System.pdf']
  },
  {
    id: '6',
    sender: 'Support Team',
    email: 'support@helpdesk.com',
    subject: '[Resolved] Ticket #12845 - Login Issue',
    snippet: 'Good news! Your support ticket has been resolved. Here is what we did...',
    time: 'Nov 6',
    unread: false,
    starred: false,
    folder: 'inbox',
    body: `Hi there,

Good news! Your support ticket #12845 regarding login issues has been resolved.

Issue Summary:
You reported being unable to log in to your account, receiving an "Invalid credentials" error despite using the correct password.

Resolution:
Our investigation revealed that your account had been temporarily locked due to multiple failed login attempts from an unfamiliar IP address. This is a security measure to protect your account.

What we did:
1. Verified your identity through secondary email
2. Unlocked your account
3. Reset your password security flags
4. Added your current IP to trusted devices

What you should do:
✓ Clear your browser cache and cookies
✓ Try logging in again with your existing password
✓ Enable two-factor authentication for added security
✓ Review recent account activity

If you experience any further issues, please don't hesitate to reach out.

Ticket Details:
- Ticket ID: #12845
- Created: Nov 4, 2025
- Resolved: Nov 6, 2025
- Response Time: 28 hours

Thank you for your patience!

Best regards,
Support Team
help@helpdesk.com`
  },
  {
    id: '7',
    sender: 'LinkedIn',
    email: 'notifications@linkedin.com',
    subject: 'You appeared in 45 searches this week',
    snippet: 'Your profile is getting noticed! See who has been viewing your profile...',
    time: 'Nov 5',
    unread: false,
    starred: false,
    folder: 'inbox',
    body: `Hi there,

Your profile is getting noticed! 👀

This Week's Stats:
- 45 profile searches
- 12 new profile views
- 8 connection requests
- 3 InMail messages

Top Search Keywords:
1. "Full Stack Developer"
2. "Vue.js Expert"
3. "UI/UX Designer"

Companies Viewing Your Profile:
• Google
• Microsoft
• Meta
• Amazon
• Startup Inc.

Boost Your Visibility:
→ Update your headline with relevant keywords
→ Add recent projects to your experience
→ Share industry insights through posts
→ Engage with your network's content

Keep up the great momentum!

Best,
The LinkedIn Team`
  },
  {
    id: '8',
    sender: 'Finance Department',
    email: 'finance@company.com',
    subject: 'Expense Report Approved - October 2025',
    snippet: 'Your expense report for October has been approved. Total amount: $1,245.80...',
    time: 'Nov 4',
    unread: false,
    starred: false,
    folder: 'inbox',
    body: `Dear Employee,

Your expense report for October 2025 has been reviewed and approved.

Report Summary:
- Report ID: EXP-2025-10-847
- Submission Date: Nov 1, 2025
- Approval Date: Nov 4, 2025
- Total Amount: $1,245.80

Expense Breakdown:
• Travel: $680.00
  - Flight tickets: $450.00
  - Hotel (3 nights): $230.00

• Meals: $285.80
  - Client dinner: $120.00
  - Team lunch: $85.80
  - Business breakfast: $80.00

• Other: $280.00
  - Conference ticket: $200.00
  - Taxi/Uber: $80.00

Payment Information:
The approved amount will be deposited to your account within 3-5 business days.

Bank Account: ****1234
Expected Deposit: Nov 7-9, 2025

If you have any questions regarding this expense report, please contact the Finance Department.

Best regards,
Finance Department`
  }
])

const activeFolder: Ref<string> = ref('inbox')
const selectedEmail: Ref<Email | null> = ref(emails.value[0] || null)
const selectedIds: Ref<Set<string>> = ref(new Set())

// ==================== COMPUTED ====================
const filteredEmails = computed(() => {
  if (activeFolder.value === 'starred') {
    return emails.value.filter(email => email.starred && email.folder !== 'trash')
  }
  return emails.value.filter(email => email.folder === activeFolder.value)
})

// ==================== METHODS ====================
function changeFolder(folder: string) {
  activeFolder.value = folder
  selectedIds.value.clear()
  const firstEmail = filteredEmails.value[0]
  selectedEmail.value = firstEmail || null
}

function selectEmail(id: string) {
  const found = emails.value.find(e => e.id === id) || null
  selectedEmail.value = found
  
  // Mark as read when selected
  if (found && found.unread) {
    found.unread = false
  }
}

function toggleCheck(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  } else {
    selectedIds.value.add(id)
  }
}

function toggleSelectAll(checked: boolean) {
  if (checked) {
    filteredEmails.value.forEach(email => {
      selectedIds.value.add(email.id)
    })
  } else {
    selectedIds.value.clear()
  }
}

function toggleStar(id: string) {
  const email = emails.value.find(e => e.id === id)
  if (email) {
    email.starred = !email.starred
  }
}

function deleteEmail(id: string) {
  const email = emails.value.find(e => e.id === id)
  if (email) {
    email.folder = 'trash'
    if (selectedEmail.value?.id === id) {
      // Select next email or null
      const currentIndex = filteredEmails.value.findIndex(e => e.id === id)
      const nextEmail = filteredEmails.value[currentIndex + 1] || filteredEmails.value[currentIndex - 1] || null
      selectedEmail.value = nextEmail
    }
  }
}

function archiveEmail(id: string) {
  const email = emails.value.find(e => e.id === id)
  if (email) {
    email.folder = 'archive'
    if (selectedEmail.value?.id === id) {
      const currentIndex = filteredEmails.value.findIndex(e => e.id === id)
      const nextEmail = filteredEmails.value[currentIndex + 1] || filteredEmails.value[currentIndex - 1] || null
      selectedEmail.value = nextEmail
    }
  }
}

function deleteSelected() {
  selectedIds.value.forEach(id => {
    deleteEmail(id)
  })
  selectedIds.value.clear()
}

function archiveSelected() {
  selectedIds.value.forEach(id => {
    archiveEmail(id)
  })
  selectedIds.value.clear()
}

function markReadSelected() {
  selectedIds.value.forEach(id => {
    const email = emails.value.find(e => e.id === id)
    if (email) {
      email.unread = false
    }
  })
  selectedIds.value.clear()
}
</script>
