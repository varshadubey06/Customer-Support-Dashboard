import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import { useTicketStore } from '../store/useTicketStore';

// TicketCard displays a preview of a single ticket card for mobile view or list item
export function TicketCard({ ticket }) {
  // Access store functions for selecting ticket and updating status
  const setSelectedTicketId = useTicketStore((state) => state.setSelectedTicketId);
  const updateTicketStatus = useTicketStore((state) => state.updateTicketStatus);

  // Helper function to pick a background color based on customer name
  const getAvatarBg = (name) => {
    const colors = [
      'bg-indigo-100 text-indigo-700',
      'bg-emerald-100 text-emerald-700',
      'bg-purple-100 text-purple-700',
      'bg-amber-100 text-amber-700',
      'bg-sky-100 text-sky-700',
    ];

    // Simple loop to calculate total character code sum
    let totalCharCodeSum = 0;
    for (let i = 0; i < name.length; i++) {
      totalCharCodeSum += name.charCodeAt(i);
    }

    const colorIndex = totalCharCodeSum % colors.length;
    return colors[colorIndex];
  };

  // Helper function to get customer initials (e.g., "Aarav Sharma" -> "AS")
  const getInitials = (name) => {
    if (!name) return '??';
    
    const words = name.split(' ');
    let initials = '';

    // Take the first letter of each word
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 0) {
        initials += words[i][0];
      }
    }

    // Return the first 2 letters in uppercase
    return initials.substring(0, 2).toUpperCase();
  };

  // Handle clicking on card to view ticket details
  const handleCardClick = () => {
    setSelectedTicketId(ticket.id);
  };

  // Handle dropdown status change without triggering card click
  const handleStatusChange = (event) => {
    event.stopPropagation(); // Prevents parent click event from firing
    const newStatus = event.target.value;
    updateTicketStatus(ticket.id, newStatus);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
    >
      {/* Top Header: Customer Info & Priority */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          {/* Avatar circle */}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarBg(
              ticket.customerName
            )}`}
          >
            {getInitials(ticket.customerName)}
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {ticket.customerName}
            </div>
            <div className="text-xs text-slate-400 font-mono">{ticket.id}</div>
          </div>
        </div>

        {/* Priority badge component */}
        <PriorityBadge priority={ticket.priority} />
      </div>

      {/* Ticket Subject and Description */}
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
          {ticket.subject}
        </h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
          {ticket.description}
        </p>
      </div>

      {/* Footer: Date & Status Selector */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{ticket.createdAt}</span>
        </div>

        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={handleCardClick}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 group-hover:text-indigo-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

