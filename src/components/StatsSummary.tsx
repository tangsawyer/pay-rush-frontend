import React from "react";
import { StatsCard } from "./StatsCard";
import { StatsResponse } from "types";

interface Props {
  stats: StatsResponse | null;
  loading?: boolean;
}

export function StatsSummary({ stats, loading = false }: Props) {
  // Format currency with Euro symbol
  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} €`;
  };

  // Icons for the stats cards
  const icons = {
    paid: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    pending: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    total: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
      </svg>
    ),
    amount: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    )
  };

  // Summary text that combines key stats (e.g., "2 payées, 750 €")
  const summaryText = !loading && stats 
    ? `${stats.total_paid} payée${stats.total_paid > 1 ? 's' : ''}, ${formatCurrency(stats.total_amount)}`
    : "Chargement...";

  return (
    <div className="border border-[#E0E0E0] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold">Statistiques</h2>
        <div className="mt-2 sm:mt-0 py-2 px-4 bg-blue-100 text-blue-800 rounded-full font-medium">
          Stats: {summaryText}
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard title="" value="" loading={true} />
          <StatsCard title="" value="" loading={true} />
          <StatsCard title="" value="" loading={true} />
          <StatsCard title="" value="" loading={true} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard 
            title="Factures payées" 
            value={stats?.total_paid || 0} 
            icon={icons.paid}
            color="green"
          />
          <StatsCard 
            title="Montant total" 
            value={formatCurrency(stats?.total_amount || 0)} 
            icon={icons.amount}
            color="blue"
          />
          <StatsCard 
            title="Factures en attente" 
            value={stats?.pending_invoices || 0} 
            icon={icons.pending}
            color="yellow"
          />
          <StatsCard 
            title="Total factures" 
            value={stats?.total_invoices || 0} 
            icon={icons.total}
            color="gray"
          />
        </div>
      )}
    </div>
  );
}
