// initial tickets
export const INITIAL_TICKETS = [
  // ticket 1
  {
    id: "TCK-1001",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@gmail.com",
    customerPhone: "+91 98765 43210",
    subject: "Cannot access invoice page on billing portal",
    description: "Whenever I click on the billing tab to download my monthly PDF receipt, it shows a 404 error page. I need this urgently for accounting.",
    priority: "High",
    status: "Open",
    createdAt: "2026-09-22 14:30",
    messages: [
      {
        id: "msg-1",
        sender: "Aarav Sharma",
        text: "Hi support team, I tried downloading my invoice for September but I keep receiving a 404 Not Found error.",
        timestamp: "2026-09-22 14:30",
        isAgent: false
      }
    ]
  },

  // ticket 2
  {
    id: "TCK-1002",
    customerName: "Priya Patel",
    customerEmail: "priya.patel@techcorp.in",
    customerPhone: "+91 98765 43211",
    subject: "API Rate limit exceeded unexpectedly",
    description: "Our backend service started receiving 429 Too Many Requests errors even though our usage is under our plan limit.",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-09-22 11:15",
    messages: [
      {
        id: "msg-1",
        sender: "Priya Patel",
        text: "Our production API key is throwing rate limit exceptions. We have upgraded our tier yesterday.",
        timestamp: "2026-09-22 11:15",
        isAgent: false
      },
      {
        id: "msg-2",
        sender: "Deepak (Support)",
        text: "Hello Priya, I'm checking with the infra team right now to make sure your tier upgrade propagates to all gateway nodes.",
        timestamp: "2026-09-22 11:45",
        isAgent: true
      }
    ]
  },

  // ticket 3
  {
    id: "TCK-1003",
    customerName: "Ananya Iyer",
    customerEmail: "ananya.iyer@gmail.com",
    customerPhone: "+91 98765 43212",
    subject: "Feature request: Dark mode for web dashboard",
    description: "Our design team spends long hours on the dashboard. Adding a dark mode toggle would greatly reduce eye strain.",
    priority: "Low",
    status: "Open",
    createdAt: "2026-09-21 16:45",
    messages: [
      {
        id: "msg-1",
        sender: "Ananya Iyer",
        text: "Would love to see dark mode added in an upcoming release! Thanks for building such a great tool.",
        timestamp: "2026-09-21 16:45",
        isAgent: false
      }
    ]
  },

  // ticket 4
  {
    id: "TCK-1004",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh.kumar@gmail.com",
    customerPhone: "+91 98765 43213",
    subject: "Password reset link is not arriving in inbox",
    description: "I tried resetting my password three times today, but the email link never arrives in my inbox or spam folder.",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2026-09-20 09:20",
    messages: [
      {
        id: "msg-1",
        sender: "Rajesh Kumar",
        text: "I forgot my password and I'm not getting the reset link.",
        timestamp: "2026-09-20 09:20",
        isAgent: false
      },
      {
        id: "msg-2",
        sender: "Sneha (Support)",
        text: "Hi Rajesh, your domain had email delivery paused due to SPF configuration. We resent the link directly to your inbox.",
        timestamp: "2026-09-20 10:05",
        isAgent: true
      },
      {
        id: "msg-3",
        sender: "Rajesh Kumar",
        text: "Got it now! Thanks Sneha!",
        timestamp: "2026-09-20 10:12",
        isAgent: false
      }
    ]
  },

  // ticket 5
  {
    id: "TCK-1005",
    customerName: "Kavya Nair",
    customerEmail: "kavya.nair@gmail.com",
    customerPhone: "+91 98765 43214",
    subject: "Unable to add new team members to workspace",
    description: "The 'Invite Member' button stays grayed out even when valid email addresses are entered.",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-09-22 08:50",
    messages: [
      {
        id: "msg-1",
        sender: "Kavya Nair",
        text: "I have admin rights but I cannot invite new team members to our workspace.",
        timestamp: "2026-09-22 08:50",
        isAgent: false
      },
      {
        id: "msg-2",
        sender: "Deepak (Support)",
        text: "Hi Kavya, looking into your workspace seat limit. Stand by.",
        timestamp: "2026-09-22 09:30",
        isAgent: true
      }
    ]
  },

  // ticket 6
  {
    id: "TCK-1006",
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@gmail.com",
    customerPhone: "+91 98765 43215",
    subject: "SSO Integration SAML metadata error",
    description: "Attempting to sync Okta SAML metadata fails with 'Invalid Certificate Signature' response.",
    priority: "High",
    status: "Open",
    createdAt: "2026-09-22 13:10",
    messages: [
      {
        id: "msg-1",
        sender: "Vikram Singh",
        text: "We are configuring Okta SSO and the metadata URL XML signature validation is failing.",
        timestamp: "2026-09-22 13:10",
        isAgent: false
      }
    ]
  },

  // ticket 7
  {
    id: "TCK-1007",
    customerName: "Pooja Verma",
    customerEmail: "pooja.verma@gmail.com",
    customerPhone: "+91 98765 43216",
    subject: "Export data to CSV format missing column headers",
    description: "When exporting customer report tables to CSV, column names are blank in the output file.",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-09-19 15:00",
    messages: [
      {
        id: "msg-1",
        sender: "Pooja Verma",
        text: "The CSV exports seem to drop header names.",
        timestamp: "2026-09-19 15:00",
        isAgent: false
      },
      {
        id: "msg-2",
        sender: "Sneha (Support)",
        text: "We patched this in hotfix v2.4.1. Please re-try downloading your CSV export now!",
        timestamp: "2026-09-19 16:20",
        isAgent: true
      }
    ]
  }
];
