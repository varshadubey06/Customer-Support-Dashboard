import React from 'react';
import { useTicketStore } from '../store/useTicketStore';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { TicketCard } from './TicketCard';
import { LoadingSkeleton, EmptyState, ErrorState } from './LoadingSkeleton';
import { MessageSquare } from 'lucide-react';

// Helper function to extract initials from customer name in a clean, step-by-step way
function getCustomerInitials(name) {
  if (!name) return '??';
  const nameParts = name.trim().split(' ');
  let initials = '';
  
  for (let i = 0; i < nameParts.length; i++) {
    if (nameParts[i].length > 0) {
      initials += nameParts[i][0];
    }
  }

  return initials.substring(0, 2).toUpperCase();
}

export function TicketList() {
  // Extract state and actions from store
  const tickets = useTicketStore((state) => state.tickets);
  const isLoading = useTicketStore((state) => state.isLoading);
  const error = useTicketStore((state) => state.error);
  const searchQuery = useTicketStore((state) => state.searchQuery);
  const statusFilter = useTicketStore((state) => state.statusFilter);
  const priorityFilter = useTicketStore((state) => state.priorityFilter);

  const setSelectedTicketId = useTicketStore((state) => state.setSelectedTicketId);
  const updateTicketStatus = useTicketStore((state) => state.updateTicketStatus);
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const resetFilters = useTicketStore((state) => state.resetFilters);

  // Filter tickets based on search text, status, and priority
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchQuery.toLowerCase();

    // Check search match
    const matchesSearch =
      searchQuery === '' ||
      ticket.customerName.toLowerCase().includes(searchLower) ||
      ticket.customerEmail.toLowerCase().includes(searchLower) ||
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.id.toLowerCase().includes(searchLower);

    // Check status match
    const matchesStatus =
      statusFilter === 'ALL' || ticket.status === statusFilter;

    // Check priority match
    const matchesPriority =
      priorityFilter === 'ALL' || ticket.priority === priorityFilter;

    // Return true only if all 3 conditions pass
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Display loading skeleton while fetching data
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Display error message if request fails
  if (error) {
    return <ErrorState error={error} onRetry={fetchTickets} />;
  }

  // Display empty state if no tickets match filters
  if (filteredTickets.length === 0) {
    return <EmptyState onReset={resetFilters} />;
  }

  return (
    <div>
      {/* Ticket summary header count */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredTickets.length}</strong> of{' '}
          {tickets.length} tickets
        </span>
        <span className="hidden sm:inline">Click any row to view full details & conversation</span>
      </div>

      {/* Desktop View: Ticket Table */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Ticket ID & Customer</th>
              <th className="py-3.5 px-4">Subject / Issue</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Created Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
              >
                {/* ID & Customer */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                      {getCustomerInitials(ticket.customerName)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {ticket.customerName}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {ticket.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Subject & Message Count */}
                <td className="py-3.5 px-4 max-w-xs">
                  <div className="font-medium text-slate-800 line-clamp-1">
                    {ticket.subject}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                    <MessageSquare className="w-3 h-3 text-slate-400" />
                    <span>{ticket.messages.length} messages</span>
                  </div>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4">
                  <PriorityBadge priority={ticket.priority} />
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={ticket.status} />
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                  {ticket.createdAt}
                </td>

                {/* Actions dropdown */}
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={ticket.status}
                    onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                    className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid View */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

