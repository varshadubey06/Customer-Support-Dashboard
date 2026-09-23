import { INITIAL_TICKETS } from '../data/mockTickets';

// storage key
const STORAGE_KEY = 'support_dashboard_tickets_v3';

// get stored data
const getInitialData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_TICKETS;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
  return INITIAL_TICKETS;
};

// api service
export const ticketApi = {
  // fetch tickets
  async fetchTickets() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tickets = getInitialData();
        resolve(tickets);
      }, 600);
    });
  },

  // update status
  async updateStatus(ticketId, newStatus) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tickets = getInitialData();
        const updated = tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true, ticketId, newStatus });
      }, 300);
    });
  },

  // add message
  async addMessage(ticketId, text, sender = "Deepak (Support)") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tickets = getInitialData();
        const now = new Date();
        const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;
        
        const newMessage = {
          id: `msg-${Date.now()}`,
          sender,
          text,
          timestamp: formattedDate,
          isAgent: true
        };

        const updated = tickets.map((ticket) => {
          if (ticket.id === ticketId) {
            return {
              ...ticket,
              messages: [...ticket.messages, newMessage]
            };
          }
          return ticket;
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true, message: newMessage });
      }, 400);
    });
  },

  // reset data
  async resetMockData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  }
};
