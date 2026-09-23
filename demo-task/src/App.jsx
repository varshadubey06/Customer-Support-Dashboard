import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { TicketList } from './components/TicketList';
import { TicketDetailModal } from './components/TicketDetailModal';
import { useTicketStore } from './store/useTicketStore';

export function App() {
  const { fetchTickets } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Summary */}
        <StatsOverview />

        {/* Filter and Search Bar */}
        <FilterBar />

        {/* Tickets Grid / Table */}
        <TicketList />
      </main>

      {/* Slide-over Ticket Detail Drawer */}
      <TicketDetailModal />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Customer Support Operations Portal &bull; Built with React & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
