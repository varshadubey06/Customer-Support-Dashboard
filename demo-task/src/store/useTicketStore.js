import { create } from 'zustand';
import { ticketApi } from '../services/ticketApi';

// ticket store
export const useTicketStore = create((set, get) => ({
  tickets: [],
  isLoading: false,
  error: null,

  // filters
  searchQuery: '',
  statusFilter: 'ALL',
  priorityFilter: 'ALL',

  // active ticket
  selectedTicketId: null,

  // fetch tickets
  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await ticketApi.fetchTickets();
      set({ tickets: data, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch tickets', isLoading: false });
    }
  },

  // update status
  updateTicketStatus: async (ticketId, newStatus) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus } : t
      ),
    }));

    try {
      await ticketApi.updateStatus(ticketId, newStatus);
    } catch (err) {
      set({ error: 'Failed to update status' });
      get().fetchTickets();
    }
  },

  // add message
  addMessageToTicket: async (ticketId, messageText) => {
    if (!messageText.trim()) return;

    try {
      const res = await ticketApi.addMessage(ticketId, messageText);
      if (res.success) {
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === ticketId
              ? { ...t, messages: [...t.messages, res.message] }
              : t
          ),
        }));
      }
    } catch (err) {
      set({ error: 'Failed to send message' });
    }
  },

  // filter actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setSelectedTicketId: (id) => set({ selectedTicketId: id }),

  // reset filters
  resetFilters: () =>
    set({
      searchQuery: '',
      statusFilter: 'ALL',
      priorityFilter: 'ALL',
    }),

  // reset data
  resetDemoData: async () => {
    set({ isLoading: true });
    const freshData = await ticketApi.resetMockData();
    set({ tickets: freshData, isLoading: false });
  }
}));
