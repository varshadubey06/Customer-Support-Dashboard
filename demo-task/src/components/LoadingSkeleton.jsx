import React from 'react';
import { Inbox, AlertCircle } from 'lucide-react';

export function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
          <div className="flex items-center space-x-3 w-1/3">
            <div className="w-9 h-9 rounded-full bg-slate-200" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 bg-slate-200 rounded w-3/4" />
              <div className="h-2.5 bg-slate-100 rounded w-1/2" />
            </div>
          </div>
          <div className="h-3.5 bg-slate-200 rounded w-1/4 hidden md:block" />
          <div className="h-6 bg-slate-200 rounded-full w-20" />
          <div className="h-6 bg-slate-100 rounded-md w-16" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ onReset }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-4">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
        <Inbox className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">No support tickets found</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
        No tickets matched your search query or status filter criteria. Try adjusting your filters.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center my-4 text-rose-700">
      <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
      <h3 className="text-base font-semibold">Failed to load tickets</h3>
      <p className="text-sm text-rose-600 mt-1">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 text-xs font-semibold text-rose-700 bg-white border border-rose-300 hover:bg-rose-100 px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Retry request
        </button>
      )}
    </div>
  );
}
