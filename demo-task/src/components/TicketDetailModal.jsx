import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Send,
  MessageSquare,
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

// TicketDetailModal displays full information for a selected ticket in a slide-over panel
export function TicketDetailModal() {
  // Store values and actions
  const tickets = useTicketStore((state) => state.tickets);
  const selectedTicketId = useTicketStore((state) => state.selectedTicketId);
  const setSelectedTicketId = useTicketStore((state) => state.setSelectedTicketId);
  const updateTicketStatus = useTicketStore((state) => state.updateTicketStatus);
  const addMessageToTicket = useTicketStore((state) => state.addMessageToTicket);

  // Local state for reply text box and sending indicator
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // Reference for auto-scrolling to latest message
  const messagesEndRef = useRef(null);

  // Find the selected ticket from tickets array
  const ticket = tickets.find((t) => t.id === selectedTicketId);

  // Auto-scroll to bottom of conversation whenever messages change
  useEffect(() => {
    if (ticket && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ticket?.messages?.length, selectedTicketId]);

  // Close modal when user presses 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedTicketId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedTicketId]);

  // If no ticket is selected, do not render anything
  if (!ticket) {
    return null;
  }

  // Handle closing modal
  const handleClose = () => {
    setSelectedTicketId(null);
  };

  // Handle submitting a new reply message
  const handleSendReply = async (event) => {
    event.preventDefault(); // Prevent full page reload on form submit
    
    // Trim whitespace to ensure message is not empty
    const cleanText = replyText.trim();
    if (cleanText === '') {
      return;
    }

    setIsSending(true);
    await addMessageToTicket(ticket.id, cleanText);
    setReplyText(''); // Clear input after sending
    setIsSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end transition-opacity">
      {/* Dark backdrop click area */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={handleClose}
      />

      {/* Main Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Panel Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md">
              {ticket.id}
            </span>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Ticket Title & Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {ticket.subject}
            </h2>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created on {ticket.createdAt}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-sm text-slate-700 leading-relaxed mt-3">
              {ticket.description}
            </div>
          </div>

          {/* Quick Status Updater */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-900">
              Update Ticket Status:
            </span>
            <div className="flex items-center space-x-2">
              {['Open', 'In Progress', 'Resolved'].map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => updateTicketStatus(ticket.id, statusOption)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    ticket.status === statusOption
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-indigo-100 border border-slate-200'
                  }`}
                >
                  {statusOption}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Contact Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="flex items-center space-x-2 text-slate-700">
                <User className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="font-semibold truncate">{ticket.customerName}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="truncate">{ticket.customerEmail}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{ticket.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Conversation History ({ticket.messages.length})</span>
              </h3>
            </div>

            <div className="space-y-3">
              {ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl text-sm border ${
                    msg.isAgent
                      ? 'bg-indigo-50/50 border-indigo-100 ml-4'
                      : 'bg-slate-50 border-slate-200/80 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`font-semibold text-xs ${
                        msg.isAgent ? 'text-indigo-700' : 'text-slate-900'
                      }`}
                    >
                      {msg.sender} {msg.isAgent && '(Support Agent)'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{msg.text}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Bottom Reply Form Input */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form onSubmit={handleSendReply} className="flex items-center space-x-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type a response to customer..."
              className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={isSending || replyText.trim() === ''}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

