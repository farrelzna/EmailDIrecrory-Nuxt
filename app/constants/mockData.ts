import type { Email } from '@/types'

// Mock Email Data
export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    subject: 'Q4 Marketing Strategy Review',
    snippet: 'Hi team, I wanted to share the latest updates on our Q4 marketing strategy...',
    datetime: '2025-11-12T10:30:00Z',
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
    datetime: '2025-11-11T14:20:00Z',
    unread: false,
    starred: false,
    folder: 'drafts',
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
    datetime: '2025-11-09T08:15:00Z',
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
    datetime: '2025-11-08T12:00:00Z',
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

📅 Upcoming Events
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
    datetime: '2025-11-07T16:45:00Z',
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
    datetime: '2025-11-06T09:10:00Z',
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
    datetime: '2025-11-05T18:05:00Z',
    unread: false,
    starred: false,
    folder: 'inbox',
    labels: ['Social'],
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
    datetime: '2025-11-04T07:55:00Z',
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
]

// Mock Current User
export const MOCK_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  photo: ''
}
