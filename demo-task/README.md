# Customer Support Ticket Management Project

Hi there! This is a Customer Support Ticket ui projectthat I built using React, JavaScript, and Tailwind CSS. The main goal of this project is to create a clean and easy-to-use support desk portal where agents can manage customer issues smoothly.

I wrote all the code in a simple and beginner-friendly style. There are no fancy bitwise tricks or complicated math functions here, just straightforward JavaScript and React concepts that are easy to follow and modify.


# What This Project Does

In a real support system, customers send complaints or requests for help. This app acts as an admin portal for the support team. Here is what you can do with it:

1. View all customer tickets in a clear table or card grid.
2. See a quick summary at the top showing total tickets, open tickets, tickets in progress, and resolved tickets.
3. Search for any ticket using the customer name, email address, subject line, or ticket ID.
4. Filter tickets by status like Open, In Progress, or Resolved, and by priority like High, Medium, or Low.
5. Click on any ticket to open a side drawer that shows customer details, phone number, and full conversation history.
6. Reply directly to the customer and update the ticket status whenever needed.


# How I Structured the Code

I split the project into small, reusable React components so that everything is clean and easy to maintain.

src/components:
- Header.jsx: The top navigation bar displaying the application logo, project title, and customer support portal branding.
- StatsOverview.jsx: Displays summary metric cards counting total tickets, open tickets, in-progress tickets, and resolved tickets.
- FilterBar.jsx: Houses the live search text box and filter dropdowns for status (Open/In Progress/Resolved) and priority (High/Medium/Low).
- TicketList.jsx: The main data container. On desktop, it renders a full table view of filtered tickets; on mobile screens, it renders a list of TicketCard components.
- TicketCard.jsx: Renders a single ticket card layout tailored for mobile screens with avatar initials, customer info, priority, date, and status selector.
- TicketDetailModal.jsx: A slide-over drawer panel that opens when a ticket is clicked. It shows customer details, ticket description, full chat conversation history, and a reply box.
- StatusBadge.jsx: Renders a small colored badge pill indicating if a ticket is Open (blue), In Progress (amber), or Resolved (emerald).
- PriorityBadge.jsx: Renders a small colored badge pill indicating if a ticket priority is High (red), Medium (orange), or Low (slate).
- LoadingSkeleton.jsx: Contains fallback UI components including skeleton loading placeholders, empty state view when no tickets match, and error retry state.

Root JSX Files:
- main.jsx: The React entry point file that attaches the main App component to the index.html webpage DOM element.
- App.jsx: The main parent component layout that connects Header, StatsOverview, FilterBar, TicketList, and TicketDetailModal together.


# How the App Works Step by Step

1. Initial Loading
When you open the page, App.jsx runs a useEffect hook that fetches the initial tickets. If you have already saved some changes earlier, it loads them from your browser localStorage. Otherwise, it loads the default mock data.

2. Live Search and Filtering
When you type in the search bar, the app converts your input to lowercase and checks if it appears inside the customer name, email, subject, or ticket ID. It also checks if the selected status or priority filter matches. Only tickets that satisfy all conditions are displayed.

3. Opening Ticket Details
When you click on a ticket row or card, its unique ID is saved in the store. The TicketDetailModal component detects this ID and slides open from the right side, rendering the full customer info and previous chat messages.

4. Replying and Changing Status
You can pick a new status from the dropdown to update a ticket. When you type a reply in the input box and click send, a new message object is added to the ticket message list. The conversation box automatically scrolls down to show your latest reply.

5. Saving Your Progress
Any change you make, like adding a message or updating a status, is saved automatically to browser localStorage. If you refresh your browser, your updated tickets and messages will still be there.


# How to Run the App Locally

1. Open your terminal in the project folder and run:
npm install

2. Start the local development server:
npm run dev

3. Open your browser and go to:
http://localhost:5173


# Why This Code is Easy to Understand

- Simple Variable Names: Every variable name clearly describes what it holds, such as customerName, searchLower, or handleSendReply.
- Standard Loops: Uses basic for loops and standard array methods like filter and map instead of confusing bitwise logic.
- Clear Comments: Key functions have short comments explaining what they do.
