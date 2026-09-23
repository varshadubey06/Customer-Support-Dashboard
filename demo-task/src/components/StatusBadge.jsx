import React from 'react';

export function StatusBadge({ status }) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Open':
        return 'bg-amber-50 text-amber-700 border-amber-200/80 ring-amber-500/20';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 ring-blue-500/20';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-emerald-500/20';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border shadow-2xs ${getBadgeStyle()}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'Open'
            ? 'bg-amber-500'
            : status === 'In Progress'
            ? 'bg-blue-500'
            : 'bg-emerald-500'
        }`}
      />
      {status}
    </span>
  );
}
