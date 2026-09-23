import React from 'react';
import { Ticket, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export function StatsOverview() {
  const { tickets, statusFilter, setStatusFilter } = useTicketStore();

  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

  const cards = [
    {
      id: 'ALL',
      title: 'Total Tickets',
      count: totalCount,
      icon: Ticket,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      activeBorder: 'ring-2 ring-indigo-500 border-indigo-500',
    },
    {
      id: 'Open',
      title: 'Open',
      count: openCount,
      icon: AlertCircle,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      activeBorder: 'ring-2 ring-amber-500 border-amber-500',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      count: inProgressCount,
      icon: Clock,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      activeBorder: 'ring-2 ring-blue-500 border-blue-500',
    },
    {
      id: 'Resolved',
      title: 'Resolved',
      count: resolvedCount,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      activeBorder: 'ring-2 ring-emerald-500 border-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = statusFilter === card.id;

        return (
          <button
            key={card.title}
            onClick={() => setStatusFilter(card.id)}
            className={`p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all text-left group cursor-pointer ${
              isActive ? card.activeBorder : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg border ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {card.count}
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {card.id === 'ALL' ? 'All tickets' : 'Filter view'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
